import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY is not set");
if (!process.env.ETHERSCAN_KEY) throw new Error("ETHERSCAN_KEY is not set");
if (!process.env.ETHERSCAN_POLYGON_KEY)
  throw new Error("ETHERSCAN_POLYGON_KEY is not set");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_KEY,
      polygon: process.env.ETHERSCAN_POLYGON_KEY,
    },
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://rpc.sepolia.org/",
      accounts: [process.env.PRIVATE_KEY],
    },
    matic: {
      chainId: 137,
      url: "https://rpc-mainnet.maticvigil.com/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
