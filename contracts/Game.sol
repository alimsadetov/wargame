pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

contract Game {

    
    address public gamerAddress;
    address public botAddress;

    address[] public units;
    address[] public botUnits;

    bool public isGamerMove = true;

    bool public isGameEnded = false;

    constructor(address gamer, address bot){
        gamerAddress = gamer;
        botAddress = bot;
    }

    function getGamerAddress() public view returns(address memory)  {
        return gamerAddress;
    }

    function getBotAddress() public view returns(address memory)  {
        return botAddress;
    }

    function getGamerUnits() public view returns(address[] memory)  {
        return units;
    }

    function getBotUnits() public view returns(address[] memory)  {
        return botUnits;
    }

    function getIsGamerMove() public view returns(bool memory)  {
        return isGamerMove;
    }

    function getIsGameEnded() public view returns(bool memory)  {
        return isGameEnded;
    }

    function changeUnits(address[] _units) public {
        tvm.accept();
        if (!isGameEnded){
            units = _units;
        }
        
    }

    function changeBotUnits(address[] _units) public {
        tvm.accept();
        if (!isGameEnded){
            botUnits = _units;
        }
        
        
    }

    function changeIsGamerMove(bool _isGamerMove) public {
        tvm.accept();
        isGamerMove = _isGamerMove;
        
    }

    function endGame(bool isGamerWins) public {
        tvm.accept();
        isGameEnded = true;
        if (isGamerWins){
            gamerAddress.transfer(address(this).balance, true, 160);
        } else {
            botAddress.transfer(address(this).balance, true, 160);
        }
    }
}