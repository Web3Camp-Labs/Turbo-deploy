// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract NEW_ERC20 is ERC20{
    address payable public tokenOwner;
    uint8 private tokenDecimals;
    uint256 public maxTokens;
    

    constructor (string memory tokenName, string memory tokenSymbol,uint8 _tokenDecimals,uint256 _maxTokens, uint256 _initBalance) ERC20(tokenName,tokenSymbol) {
        tokenOwner = payable(msg.sender);
        tokenDecimals= _tokenDecimals;
        maxTokens = _maxTokens;

        mint(_initBalance);
    }


    function decimals() public view override returns (uint8) {
        return tokenDecimals;
    }

    function mint (uint256 amount) public  {
         require(totalSupply() + amount <= maxTokens,"succeed max");
          _mint(msg.sender,amount);
    }
}