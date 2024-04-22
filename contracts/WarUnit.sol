pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

abstract contract WarUnit {

    
    string public unitType;

    int public hp;
    uint public attackPower;
    uint public protectionPower;
    uint public hilling;

    bool public isHillAvail;

    bool public isDead = false;


    function getHp() public view returns(int memory) {
        return hp;
    }

    function getUnitType() public view returns(string memory)  {
        return unitType;
    }

    function getIsHillAvail() public view returns(bool memory) {
        return isHillAvail;
    }

    function getIsDead() public view returns(bool memory) {
        return isDead;
    }

    function takeAttack(uint attackerPower) public {
        tvm.accept();
        if (!isDead){
            hp = hp - (int(attackerPower) - int(protectionPower));
            checkDeath();
        }
    }

    function checkDeath() public {
        if (hp<=0) {
            isDead = true;
        }
    }

    function heal(uint hillingAmount) public {
        tvm.accept();
        if (!isDead){
            hp = hp + int(hillingAmount);
        }
    }
}