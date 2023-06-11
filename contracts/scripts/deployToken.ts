import hre, { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const factory = await ethers.getContractFactory("Token", deployer);
  const contract = await factory.deploy();

  const deployment = await contract.waitForDeployment();

  await new Promise((resolve) => setTimeout(resolve, 10000));

  console.log(await deployment.getAddress());

  while (true) {
    try {
      await hre.run("verify:verify", {
        address: await deployment.getAddress(),
        contract: "contracts/Token.sol:Token",
        constructorArguments: [],
      });
      break;
    } catch (e) {
      console.log("waiting", e);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

main();
