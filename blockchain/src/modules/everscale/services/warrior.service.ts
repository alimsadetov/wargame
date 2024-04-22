import { ConfigService } from '@nestjs/config';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { BaseContractService } from './base-contract.service';
import { WarriorType } from '../enums/warrior-type.enum';
import { DpsWarriorAbi } from '../abi/DpsWarrior.abi';
import { SubWarriorAbi } from '../abi/SubWarrior.abi';
import { TankWarriorAbi } from '../abi/TankWarrior.abi';
import { HillerAbi } from '../abi/Hiller.abi';

export class WarriorService extends BaseContractService{
  protected rpcProvider: ProviderRpcClient;
  protected collectionInpageProvider;
  protected warriorType: WarriorType;

  constructor(protected readonly configService: ConfigService, warriorType: WarriorType, address: string) {
    super(configService)
    this.warriorType = warriorType
    this.collectionInpageProvider = new this.rpcProvider.Contract(this.getWarriorAbi(), new Address(address))
  }

  async getWarriorAbi(){
    switch(this.warriorType){
      case WarriorType.DPS: 
        return DpsWarriorAbi
      case WarriorType.SUB:
        return SubWarriorAbi
      case WarriorType.TANK:
        return TankWarriorAbi
      case WarriorType.HILLER:
        return HillerAbi
    }
  }

  async getHp(): Promise<number>{
    return +(await this.collectionInpageProvider.methods.getHp({}).call()).memory
  }

  async getUnitType(): Promise<string>{
    return (await this.collectionInpageProvider.methods.getUnitType({}).call()).memory
  }

  async getIsHillAvail(): Promise<boolean>{
    return (await this.collectionInpageProvider.methods.getIsHillAvail({}).call()).memory
  }

  async getIsDead(): Promise<boolean>{
    return (await this.collectionInpageProvider.methods.getIsDead({}).call()).memory
  }
  
  async getAttackPower(): Promise<number>{
    return +(await this.collectionInpageProvider.methods.attackPower({}).call()).attackPower
  }

  async getProtectionPower(): Promise<number>{
    return +(await this.collectionInpageProvider.methods.protectionPower({}).call()).protectionPower
  }

  async getHillingAmount(): Promise<number>{
    return +(await this.collectionInpageProvider.methods.hilling({}).call()).hilling
  }

  async takeAttack(attackerPower: number){
    return await this.sendTransactionFromWallet(0.02, 'takeAttack', {attackerPower})
  }

  async heal(healingAmount: number){
    return await this.sendTransactionFromWallet(0.02, 'heal', {hillingAmount: healingAmount})
  }
}
