import hre, { ethers } from "hardhat";

const TOKEN_ADDRESS = "0x9589620de32943695e99751F5C64fB0e69e14e13";

async function main() {
  const [deployer] = await ethers.getSigners();

  const factory = await ethers.getContractFactory("Hackbacker", deployer);
  const contract = await factory.deploy(TOKEN_ADDRESS);

  const deployment = await contract.waitForDeployment();

  await new Promise((resolve) => setTimeout(resolve, 10000));

  while (true) {
    try {
      await hre.run("verify:verify", {
        address: await deployment.getAddress(),
        constructorArguments: [TOKEN_ADDRESS],
      });
      break;
    } catch (e) {
      console.log("waiting");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

main();
