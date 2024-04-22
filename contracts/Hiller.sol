pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

import "./WarUnit.sol";

contract TankWarrior is WarUnit{

    constructor(
    ) {
        unitType = "hiller";
        hp = 130;
        attackPower = 30;
        protectionPower = 10;
        hilling = 30;
        isHillAvail=true;
    }
}