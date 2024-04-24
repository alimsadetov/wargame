import { ConfigService } from '@nestjs/config';
import { Address, Contract, ProviderRpcClient } from 'everscale-inpage-provider';
import { BaseContractService } from './base-contract.service';
import { WarriorType } from '../enums/warrior-type.enum';
import { GameAbi } from '../abi/Game.abi';

export class WarriorService extends BaseContractService {
  protected rpcProvider: ProviderRpcClient;
  protected collectionInpageProvider: Contract<typeof GameAbi>;

  constructor(
    protected readonly configService: ConfigService,
    address: string,
  ) {
    super(configService);
    this.collectionInpageProvider = new this.rpcProvider.Contract(
      GameAbi,
      new Address(address),
    );
  }

  async getGamerAddress(): Promise<Address> {
    return (await this.collectionInpageProvider.methods.gamerAddress({}).call())
      .gamerAddress;
  }

  async getBotAddress(): Promise<Address> {
    return (await this.collectionInpageProvider.methods.botAddress({}).call())
      .botAddress;
  }

  async getGamerUnits(): Promise<Address[]> {
    return (await this.collectionInpageProvider.methods.units({}).call())
      .units;
  }

  async getBotUnits(): Promise<Address[]> {
    return (await this.collectionInpageProvider.methods.botUnits({}).call())
      .botUnits;
  }

  async isGamerMove(): Promise<boolean> {
    return (await this.collectionInpageProvider.methods.isGamerMove({}).call())
      .isGamerMove;
  }

  async isGameEnded(): Promise<boolean> {
    return (await this.collectionInpageProvider.methods.isGameEnded({}).call())
      .isGameEnded;
  }

  async changeUnits(_units: Address[]) {
    return await this.sendTransactionFromWallet(0.02, 'changeUnits', {
      _units,
    });
  }

  async changeBotUnits(_units: Address[]) {
    return await this.sendTransactionFromWallet(0.02, 'changeBotUnits', {
      _units,
    });
  }

  async changeIsGamerMove(_isGamerMove: boolean) {
    return await this.sendTransactionFromWallet(0.02, 'changeIsGamerMove', {
      _isGamerMove,
    });
  }

  async endGame(isGamerWins: boolean) {
    return await this.sendTransactionFromWallet(0.02, 'endGame', {
      isGamerWins,
    });
  }
}
