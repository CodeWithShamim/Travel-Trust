// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, eaddress, euint8, euint32, euint64, externalEuint64, externalEuint8} from '@fhevm/solidity/lib/FHE.sol';
import {ZamaEthereumConfig} from '@fhevm/solidity/config/ZamaConfig.sol';
// import 'hardhat/console.sol';

contract TravelTrust is ZamaEthereumConfig {
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

  //service => buyer => true/false
  mapping(string => mapping(address => bool)) public hasPaymented;

  // Temporary storage for pending decryption requests
  struct PaymentRequest {
    address buyer;
    address serviceOwner;
    string serviceId;
    uint256 paidAmount;
  }

  mapping(uint256 => PaymentRequest) public pendingRequests;

  uint256 public serviceFees;

  // ----event start ----
  event ServiceFeesWithdrawn(address indexed to, uint256 amount);
  event ServiceAdded(string indexed serviceId, string name, address indexed owner);
  event ServicePaid(address indexed buyer, address indexed serviceOwner, string indexed serviceId);
  event ServiceDecryptionRequested(uint256 requestId, string serviceId);

  event ReviewSubmitted(address indexed reviewer, string indexed serviceId);
  // -------- event end -----------

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Only owner can call.');
    _;
  }

  function withdrawServiceFees(address to) external onlyOwner {
    require(serviceFees > 0, 'No fees to withdraw');
    uint256 amount = serviceFees;
    serviceFees = 0;
    (bool sent, ) = payable(to).call{value: amount}('');
    require(sent, 'Withdraw failed');
    emit ServiceFeesWithdrawn(to, amount);
  }

  // Add a new service
  function addService(
    string memory serviceId,
    string memory name,
    externalEuint64 encryptedPrice,
    bytes calldata inputProof
  ) external payable {
    require(services[msg.sender][serviceId].owner == address(0), 'Service already exists');

    serviceFees += msg.value;

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

  // -Pay for a service
  function servicePayment(address serviceOwner, string memory serviceId) external payable {
    Service storage svc = services[serviceOwner][serviceId];
    require(svc.owner != address(0), 'Service not found');
    require(!hasPaymented[serviceId][msg.sender], 'You already payment for this service');

    // initial this payment paid for prevent duplicates
    // hasPaymented[serviceId][msg.sender] = true;

    // prevent self-payment
    require(msg.sender != serviceOwner, 'Owner cannot pay self');

    // Generate request ID for self-relaying decryption
    uint256 reqId = uint256(keccak256(abi.encodePacked(
      block.timestamp,
      msg.sender,
      serviceOwner,
      serviceId,
      msg.value
    )));

    pendingRequests[reqId] = PaymentRequest({
      buyer: msg.sender,
      serviceOwner: serviceOwner,
      serviceId: serviceId,
      paidAmount: msg.value
    });

    emit ServiceDecryptionRequested(reqId, serviceId);
  }

  // The relayer passes ABI-encoded cleartexts and a decryption proof
  function priceDycryptCallback(
    uint256 requestId,
    bytes memory cleartexts,
    bytes memory decryptionProof
  ) external payable {
    // Get the payment request
    PaymentRequest memory req = pendingRequests[requestId];
    require(req.buyer != address(0), 'Invalid request ID');

    Service storage svc = services[req.serviceOwner][req.serviceId];

    // Create the handles list that was used for decryption
    bytes32[] memory handlesList = new bytes32[](1);
    handlesList[0] = FHE.toBytes32(svc.price);

    // Verify the KMS signatures
    FHE.checkSignatures(handlesList, cleartexts, decryptionProof);

    // Decode the cleartexts back into uint64 values
    uint64 decryptedPrice = abi.decode(cleartexts, (uint64));

    require(req.paidAmount == uint256(decryptedPrice), 'Incorrect payment amount');

    // Finalize payment
    (bool sent, ) = payable(svc.owner).call{value: req.paidAmount}('');
    require(sent, 'Payment failed');

    hasPaymented[req.serviceId][req.buyer] = true;
    delete pendingRequests[requestId];
    emit ServicePaid(req.buyer, req.serviceOwner, req.serviceId);
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
