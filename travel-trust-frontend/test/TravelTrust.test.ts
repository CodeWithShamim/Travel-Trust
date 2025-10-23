// import { expect } from 'chai';
// import hre from 'hardhat';
// const { ethers } = hre;
// import { TravelTrust } from '../typechain-types'; // after TypeChain generation

// describe('TravelTrust', function () {
//   async function deployFixture() {
//     const [owner, alice, bob] = await ethers.getSigners();
//     const Factory = await ethers.getContractFactory('TravelTrust');
//     const contract = (await Factory.deploy()) as TravelTrust;
//     await contract.waitForDeployment();
//     return { owner, alice, bob, contract };
//   }

//   it('sets owner on deploy', async function () {
//     const { owner, contract } = await deployFixture();
//     expect(await contract.owner()).to.equal(owner.address);
//   });

//   it('owner can withdraw service fees', async function () {
//     const { owner, alice, contract } = await deployFixture();
//     // Send some ether to contract via addService
//     const fakeEncryptedPrice = ethers.zeroPadValue('0x1234', 32);
//     const fakeProof = '0x1234';
//     const fee = ethers.parseEther('0.01');

//     await contract
//       .connect(alice)
//       .addService('svc1', 'Test Service', fakeEncryptedPrice, fakeProof, { value: fee });

//     const before = await ethers.provider.getBalance(owner.address);

//     const tx = await contract.withdrawServiceFees(owner.address);
//     await tx.wait();

//     const after = await ethers.provider.getBalance(owner.address);
//     expect(after).to.be.gt(before);
//   });

//   it('adds a new service', async function () {
//     const { alice, contract } = await deployFixture();
//     const fakeEncryptedPrice = ethers.zeroPadValue('0x1234', 32);
//     const fakeProof = '0x1234';
//     const fee = ethers.parseEther('0.01');

//     const tx = await contract
//       .connect(alice)
//       .addService('svc1', 'Mountain Trip', fakeEncryptedPrice, fakeProof, { value: fee });

//     await expect(tx)
//       .to.emit(contract, 'ServiceAdded')
//       .withArgs('svc1', 'Mountain Trip', alice.address);

//     const svc = await contract.getService('svc1', alice.address);
//     expect(svc.name).to.equal('Mountain Trip');
//     expect(svc.owner).to.equal(alice.address);
//   });

//   it('prevents duplicate services', async function () {
//     const { alice, contract } = await deployFixture();
//     const fakeEncryptedPrice = ethers.zeroPadValue('0x1234', 32);
//     const fakeProof = '0x1234';
//     const fee = ethers.parseEther('0.01');

//     await contract
//       .connect(alice)
//       .addService('svc1', 'Service 1', fakeEncryptedPrice, fakeProof, { value: fee });
//     await expect(
//       contract
//         .connect(alice)
//         .addService('svc1', 'Service 1 Duplicate', fakeEncryptedPrice, fakeProof, { value: fee }),
//     ).to.be.revertedWith('Service already exists');
//   });

//   it('allows submitting a review', async function () {
//     const { alice, bob, contract } = await deployFixture();
//     const fakeEncryptedPrice = ethers.zeroPadValue('0x1234', 32);
//     const fakeProof = '0x1234';
//     const fee = ethers.parseEther('0.01');

//     await contract
//       .connect(alice)
//       .addService('svc1', 'City Tour', fakeEncryptedPrice, fakeProof, { value: fee });

//     const fakeEncryptedRating = ethers.zeroPadValue('0x05', 32);
//     const reviewProof = '0xabcd';

//     const tx = await contract
//       .connect(bob)
//       .submitReview(alice.address, 'svc1', fakeEncryptedRating, reviewProof, 'Excellent tour!');
//     await expect(tx).to.emit(contract, 'ReviewSubmitted').withArgs(bob.address, 'svc1');

//     const review = await contract.getReview('svc1', bob.address);
//     expect(review.exists).to.equal(true);
//     expect(review.comment).to.equal('Excellent tour!');
//   });

//   it('prevents duplicate reviews from the same reviewer', async function () {
//     const { alice, bob, contract } = await deployFixture();
//     const fakeEncryptedPrice = ethers.zeroPadValue('0x1234', 32);
//     const fakeProof = '0x1234';
//     const fee = ethers.parseEther('0.01');

//     await contract
//       .connect(alice)
//       .addService('svc1', 'Beach Resort', fakeEncryptedPrice, fakeProof, { value: fee });

//     const fakeEncryptedRating = ethers.zeroPadValue('0x04', 32);
//     const reviewProof = '0xabcd';

//     await contract
//       .connect(bob)
//       .submitReview(alice.address, 'svc1', fakeEncryptedRating, reviewProof, 'Nice resort!');
//     await expect(
//       contract
//         .connect(bob)
//         .submitReview(alice.address, 'svc1', fakeEncryptedRating, reviewProof, 'Second review'),
//     ).to.be.revertedWith('Review already submitted');
//   });

//   it('ping works only for owner', async function () {
//     const { owner, bob, contract } = await deployFixture();
//     expect(await contract.connect(owner).ping()).to.equal('pong');
//     await expect(contract.connect(bob).ping()).to.be.revertedWith('Only owner can call.');
//   });
// });
