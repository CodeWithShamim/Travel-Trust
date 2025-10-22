// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, eaddress, euint8, euint32, euint64, externalEuint64, externalEuint8} from '@fhevm/solidity/lib/FHE.sol';
import {SepoliaConfig} from '@fhevm/solidity/config/ZamaConfig.sol';

contract TravelTrust is SepoliaConfig {
  struct Review {
    euint8 rating;
    string comment;
    bool exists;
  }

  struct ServiceStats {
    euint32 totalSum;
    euint32 totalCount;
  }

  struct Service {
    string id;
    address owner;
    string name;
    euint64 price;
  }

  address public owner;

  // service owner -> serviceId -> Service
  mapping(address => mapping(string => Service)) public services;

  // serviceId -> reviwer => Revieww
  mapping(string => mapping(address => Review)) public reviews;

  mapping(string => ServiceStats) public serviceStats;

  event ServiceAdded(string indexed serviceId, string name, address indexed owner);
  event ReviewSubmitted(address indexed reviewer, string indexed serviceId);

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Only owner can call.');
    _;
  }

  // Add a new service
  function addService(
    string memory serviceId,
    string memory name,
    externalEuint64 encryptedPrice,
    bytes calldata inputProof
  ) external {
    require(services[msg.sender][serviceId].owner == address(0), 'Service already exists');

    euint64 price = FHE.fromExternal(encryptedPrice, inputProof);

    FHE.allowThis(price);

    services[msg.sender][serviceId] = Service({
      id: serviceId,
      owner: msg.sender,
      name: name,
      price: price
    });

    // for public decrypt
    FHE.makePubliclyDecryptable(price);

    emit ServiceAdded(serviceId, name, msg.sender);
  }

  // Submit a review for a service owned by serviceOwner. Anyone can call this.
  function submitReview(
    address serviceOwner,
    string memory serviceId,
    externalEuint8 encryptedRating,
    bytes calldata inputProof,
    string calldata comment
  ) external {
    Service storage svc = services[serviceOwner][serviceId];
    require(svc.owner != address(0), 'Service not found');

    // don't allow same reviewer to submit twice
    require(!reviews[serviceId][msg.sender].exists, 'Review already submitted');

    euint8 rating = FHE.fromExternal(encryptedRating, inputProof);

    // allow for revieww + current contract
    FHE.allow(rating, msg.sender);
    FHE.allowThis(rating);

    // update stats
    euint32 rating32 = FHE.asEuint32(rating);
    euint32 one = FHE.asEuint32(1);

    ServiceStats storage stats = serviceStats[serviceId];
    stats.totalSum = FHE.add(stats.totalSum, rating32);
    stats.totalCount = FHE.add(stats.totalCount, one);

    FHE.allowThis(stats.totalSum);
    FHE.allowThis(stats.totalCount);

    reviews[serviceId][msg.sender] = Review({rating: rating, comment: comment, exists: true});

    emit ReviewSubmitted(msg.sender, serviceId);
  }

  // get service
  function getService(
    string memory serviceId,
    address sOwner
  ) external view returns (Service memory) {
    require(services[sOwner][serviceId].owner != address(0), 'Service not found');
    return services[sOwner][serviceId];
  }

  // get reviews
  function getReview(
    string memory serviceId,
    address reviewer
  ) external view returns (Review memory) {
    return reviews[serviceId][reviewer];
  }

  // test contract
  function ping() public view onlyOwner returns (string memory) {
    return 'pong';
  }

  receive() external payable {}
}
