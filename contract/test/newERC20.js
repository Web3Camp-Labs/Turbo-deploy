const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NEW_ERC20", function () {
 
  async function deployOneYearLockFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("NEW_ERC20");

    // string memory tokenName, string memory tokenSymbol,uint8 _tokenDecimals,uint256 _maxTokens, uint256 _initBalance
  
    const _maxTokens = ethers.parseUnits("1000000000",16);
    const _initBalance = ethers.parseUnits("1000",16);

    const lock = await Lock.deploy("My TOKEN","MTK",16,_maxTokens,_initBalance);

    return { lock, owner, otherAccount };
  }

  describe("Transfers", function () {
    it("Should transfer the funds to the owner", async function () {
      const { lock,owner} = await loadFixture(
        deployOneYearLockFixture
      );

      let otherAccountBal = await lock.balanceOf(owner);

        console.log(lock.target,otherAccountBal.toString(),owner.address)
    });
  });
});
