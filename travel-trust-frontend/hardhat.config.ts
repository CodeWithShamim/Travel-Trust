// import '@fhevm/hardhat-plugin';
// import '@nomicfoundation/hardhat-chai-matchers';
// import '@nomicfoundation/hardhat-ethers';
// import '@nomicfoundation/hardhat-verify';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import type { HardhatUserConfig } from 'hardhat/config';

import 'dotenv/config'; // <- load .env

const MNEMONIC: string =
  process.env.MNEMONIC || 'test test test test test test test test test test test junk';
const INFURA_API_KEY: string = process.env.INFURA_API_KEY || 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || '',
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
    },
    sepolia: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    },
  },
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: 'cancun',
      metadata: { bytecodeHash: 'none' },
    },
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
};

export default config;
