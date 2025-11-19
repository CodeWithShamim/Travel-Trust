import { expect } from 'chai';
import hre from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import '@nomicfoundation/hardhat-chai-matchers';
import { parseEther, type Signer } from 'ethers';

const { ethers, fhevm } = hre as unknown as HardhatRuntimeEnvironment & {
  fhevm: any;
  ethers: any;
};

describe('TravelTrust test', function () {
  let owner: Signer;
  let alice: Signer;
  let bob: Signer;
  let contract: any;

  // reusable mocks for tests
  let mockFee: bigint;
  let mockEncryptedPrice: any;
  let mockEncryptedRating: any;

  // check FHEVM mock and initialize CLI >>>
  before(async function () {
    if (!fhevm.isMock) {
      throw new Error('Tests require FHEVM mock environment');
    }
    await fhevm.initializeCLIApi();
  });

  // deploy fresh contract and prepare mocks >>>>>>
  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();

    // Deploy TravelTrust contract
    const Factory = await ethers.getContractFactory('TravelTrust');
    contract = await Factory.deploy();
    await contract.waitForDeployment();

    mockFee = ethers.parseEther('0.01');

    mockEncryptedPrice = await fhevm
      .createEncryptedInput(await contract.getAddress(), await alice.getAddress())
      .add64(mockFee)
      .encrypt();

    mockEncryptedRating = await fhevm
      .createEncryptedInput(await contract.getAddress(), await bob.getAddress())
      .add8(BigInt(5))
      .encrypt();
  });

  it('Should set the owner correctly', async function () {
    expect(await contract.owner()).to.equal(await owner.getAddress());
  });

  it('Swner can withdraw service fees', async function () {
    // Add service to generate fees in contract
    await contract
      .connect(alice)
      .addService(
        'svc1',
        'Test Service',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    const balanceBefore = await ethers.provider.getBalance(await owner.getAddress());

    // Withdraw fees
    const tx = await contract.connect(owner).withdrawServiceFees(await owner.getAddress());
    await tx.wait();

    const balanceAfter = await ethers.provider.getBalance(await owner.getAddress());
    expect(balanceAfter).to.be.gt(balanceBefore);
  });

  it('Should add a new service', async function () {
    const tx = await contract
      .connect(alice)
      .addService(
        'svc2',
        'Mountain Trip',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    // Expect ServiceAdded event to be emitted
    await expect(tx)
      .to?.emit(contract, 'ServiceAdded')
      .withArgs('svc2', 'Mountain Trip', await alice.getAddress());

    // Verify service data stored correctly
    const svc = await contract.getService('svc2', await alice.getAddress());
    expect(svc.name).to.equal('Mountain Trip');
    expect(svc.owner).to.equal(await alice.getAddress());
  });

  it('Prevents duplicate services', async function () {
    await contract
      .connect(alice)
      .addService(
        'svc3',
        'Beach Trip',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    // Attempt to add service with same ID and expect revert
    await expect(
      contract
        .connect(alice)
        .addService(
          'svc3',
          'Beach Trip Duplicate',
          mockEncryptedPrice.handles[0],
          mockEncryptedPrice.inputProof,
          { value: mockFee },
        ),
    ).to.be.revertedWith('Service already exists');
  });

  // ----------------payment---------------------
  it('Allows payment for a service with FHE decryption', async function () {
    await contract
      .connect(alice)
      .addService(
        'svcPay',
        'City Tour',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    const payTx = await contract
      .connect(bob)
      .servicePayment(await alice.getAddress(), 'svcPay', { value: mockFee });

    // Verify ServiceDecryptionRequested event was emitted
    await expect(payTx)
      .to.emit(contract, 'ServiceDecryptionRequested');

    // Note: In the updated system, payment requires manual relayer processing
    // This test verifies the payment request is created successfully
    const paid = await contract.hasPaymented('svcPay', await bob.getAddress());
    expect(paid).to.equal(false); // Payment not processed until relayer callback
  });

  it('Prevents duplicate payments', async function () {
    await contract
      .connect(alice)
      .addService(
        'svcDupPay',
        'Safari',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    const payTx = await contract
      .connect(bob)
      .servicePayment(await alice.getAddress(), 'svcDupPay', { value: mockFee });

    // Wait until the transaction is confirmed in a block
    const receipt = await payTx.wait();
    // console.log('First payment mined in tx:', receipt.transactionHash);

    if (receipt.transactionHash) {
      await expect(
        contract
          .connect(bob)
          .servicePayment(await alice.getAddress(), 'svcDupPay', { value: mockFee }),
      ).to.be.revertedWith('You already payment for this service');
    }
  });

  // data for service= serviceId=>serviceName=>encryptedhandle=>proof
  // data for review= serviceOwner=>serviceId=>encryptedhandle=>proof=>comment
  it('Submits a review and prevents duplicates', async function () {
    await contract
      .connect(alice)
      .addService(
        'svcReview',
        'Museum Tour',
        mockEncryptedPrice.handles[0],
        mockEncryptedPrice.inputProof,
        { value: mockFee },
      );

    const tx = await contract
      .connect(bob)
      .submitReview(
        await alice.getAddress(),
        'svcReview',
        mockEncryptedRating.handles[0],
        mockEncryptedRating.inputProof,
        'Excellent!',
      );
    await expect(tx)
      .to.emit(contract, 'ReviewSubmitted')
      .withArgs(await bob.getAddress(), 'svcReview');

    // Verify review stored correctly
    const review = await contract.getReview('svcReview', await bob.getAddress());
    expect(review.exists).to.equal(true);
    expect(review.comment).to.equal('Excellent!');

    // Attempt duplicate review
    await expect(
      contract
        .connect(bob)
        .submitReview(
          await alice.getAddress(),
          'svcReview',
          mockEncryptedRating.handles[0],
          mockEncryptedRating.inputProof,
          'Second review',
        ),
    ).to.be.revertedWith('Review already submitted');
  });

  it('Ping works only for owner', async function () {
    expect(await contract.connect(owner).ping()).to.equal('pong');
    await expect(contract.connect(bob).ping()).to.be.revertedWith('Only owner can call.');
  });
});
