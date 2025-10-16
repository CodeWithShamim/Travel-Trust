// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint64, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract TravelTrust {
    euint64 private secret;

    function setSecret(euint64 value) external {
        secret = value;
    }

    function makePublic() external {
        FHE.makePubliclyDecryptable(secret);
    }
}
