// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const _maxTokens = hre.ethers.parseUnits("1000000000",16);
  const _initBalance = hre.ethers.parseUnits("1000",16);

  const lock = await hre.ethers.deployContract("NEW_ERC20", ["My TOKEN","MTK",16,_maxTokens,_initBalance]);

  await lock.waitForDeployment();

  console.log(
    `deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
