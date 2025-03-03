import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AcademicCredential = await ethers.getContractFactory("AcademicCredential");
  const academicCredential = await AcademicCredential.deploy();

  await academicCredential.waitForDeployment();

  console.log("AcademicCredential deployed to:", await academicCredential.getAddress());
  
  // Add the deployer as an institution for testing
  const INSTITUTION_ROLE = ethers.keccak256(ethers.toUtf8Bytes("INSTITUTION_ROLE"));
  await academicCredential.grantRole(INSTITUTION_ROLE, deployer.address);
  console.log("Deployer added as an institution");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });