pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("TT", "TT") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
