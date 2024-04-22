import { ConfigService } from '@nestjs/config';
import { DEVNET_ADDRESSES } from '../abi/addresses';
import { Blockchain } from './blockchain.service';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

export abstract class BaseContractService {
  protected rpcProvider: ProviderRpcClient;
  protected collectionInpageProvider;

  constructor(protected readonly configService: ConfigService) {}

  initBase() {
    const blockchain = Blockchain.getInstance(this.configService);
    this.rpcProvider = blockchain.getRpcProvider();
  }

  async checkAccountExist(address: string): Promise<boolean> {
    try {
      const state = await this.rpcProvider.getFullContractState({
        address: new Address(address),
      });
      if (state.state) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getBalance(address: string): Promise<string> {
      return await this.rpcProvider.getBalance(new Address(address))
  }

  async sendTransactionFromWallet(
    gasFee: number,
    method: string,
    params: any,
  ) {
    console.log('use jrpc', method);
    console.log(params)
    const res = await this.collectionInpageProvider.methods[method](
      params,
    ).send({
      from: new Address(DEVNET_ADDRESSES.Wallet),
      amount: gasFee.toString(),
      bounce: true,
    });
    return res;
  }
}
