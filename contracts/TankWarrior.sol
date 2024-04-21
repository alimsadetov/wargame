pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

import "./WarUnit.sol";

contract TankWarrior is WarUnit{

    constructor(
    ) {
        unitType = "tank";
        hp = 155;
        attackPower = 30;
        protectionPower = 15;
        hilling = 0;
        isHillAvail=false;
    }
}