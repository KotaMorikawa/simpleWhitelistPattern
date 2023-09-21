const hre = require("hardhat");

const contractAddress = process.env.CONTRACT_ADDRESS;

async function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

async function main() {
  const nftContract = await hre.ethers.deployContract("CryptoDevs", [
    contractAddress,
  ]);

  await nftContract.waitForDeployment();

  console.log("NFT Contract address:", nftContract.target);

  await sleep(30 * 1000);

  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
