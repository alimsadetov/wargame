pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

import "./WarUnit.sol";

contract DpsWarrior is WarUnit{

    constructor(
    ) {
        unitType = "sub";
        hp = 130;
        attackPower = 60;
        protectionPower = 10;
        hilling = 0;
        isHillAvail=false;
    }
}