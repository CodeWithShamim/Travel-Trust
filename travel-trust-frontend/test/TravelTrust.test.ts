// const { expect } = require('chai');
// const hre = require('hardhat');
// const { ethers } = hre;

// // mock 64-bit handle helper
// function mockHandle(val) {
//   return ethers.toBigInt(val);
// }

// describe('ZamaPlatform', function () {
//   let platform;
//   let owner;
//   let userId;

//   beforeEach(async function () {
//     [owner] = await ethers.getSigners();
//     const ZamaPlatform = await hre.ethers.getContractFactory('ZamaPlatform');
//     platform = await ZamaPlatform.deploy();
//     await platform.waitForDeployment();
//     userId = ethers.keccak256(ethers.toUtf8Bytes('user-001'));
//   });

//   it('should create a user with encrypted fields', async function () {
//     const contactHandle = mockHandle(123456789);
//     const ageHandle = mockHandle(30);

//     const tx = await platform.createUser(
//       userId,
//       'alice',
//       ethers.keccak256(ethers.toUtf8Bytes('alice@example.com')),
//       ethers.keccak256(ethers.toUtf8Bytes('hashed_pw')),
//       'ipfs://profile1',
//       contactHandle,
//       0, // Role.USER
//       'female',
//       ageHandle,
//       '123 blockchain ave',
//       'ipfs://banner',
//     );

//     await tx.wait();

//     const user = await platform.users(userId);
//     expect(user.username).to.equal('alice');
//   });

//   it('should mark contact handle publicly decryptable', async function () {
//     const contactHandle = mockHandle(111111111);
//     const ageHandle = mockHandle(25);
//     await platform.createUser(
//       userId,
//       'bob',
//       ethers.keccak256(ethers.toUtf8Bytes('bob@example.com')),
//       ethers.keccak256(ethers.toUtf8Bytes('pw')),
//       'ipfs://profile2',
//       contactHandle,
//       0,
//       'male',
//       ageHandle,
//       'xyz street',
//       'ipfs://banner',
//     );

//     const tx = await platform.makeUserContactPublic(userId);
//     await expect(tx).to.emit(platform, 'HandleMarkedPublic').withArgs(userId, contactHandle);
//   });

//   it('should create a service', async function () {
//     const serviceId = ethers.keccak256(ethers.toUtf8Bytes('svc-001'));
//     const tx = await platform.createService(
//       serviceId,
//       'Hotel Stay',
//       'Nice 5-star hotel package',
//       1000,
//       'ipfs://hotelimg',
//       'Paris',
//       3, // Hotels
//       0, // Available
//     );
//     await tx.wait();

//     const svc = await platform.services(serviceId);
//     expect(svc.name).to.equal('Hotel Stay');
//   });
// });
