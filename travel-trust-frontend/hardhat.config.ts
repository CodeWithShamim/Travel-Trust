require('@fhevm/hardhat-plugin');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');
require('@typechain/hardhat');
require('hardhat-deploy');
require('hardhat-gas-reporter');
require('solidity-coverage');
require('dotenv').config(); // load .env

const MNEMONIC =
  process.env.MNEMONIC || 'test test test test test test test test test test test junk';
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  defaultNetwork: 'hardhat',
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
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
    version: '0.8.24',
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

module.exports = config;
