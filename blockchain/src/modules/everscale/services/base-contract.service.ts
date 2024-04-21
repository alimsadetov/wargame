import { ConfigService } from '@nestjs/config';
import { EvernetType } from '../types/evernet.type';
import { DEVNET_ADDRESSES, MAINNET_ADDRESSES } from '../abi/addresses';
import { Blockchain } from './blockchain.service';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { UserProfileRootAbiAsConst } from '../abi/UserProfileRoot.abi';

export abstract class BaseContractService {
  protected rpcProvider: ProviderRpcClient;
  protected collectionInpageProvider;
  protected evernet: EvernetType;

  constructor(protected readonly configService: ConfigService) {}

  initBase() {
    const blockchain = Blockchain.getInstance(this.configService);
    this.rpcProvider = blockchain.getRpcProvider(this.evernet);
  }

  async runLocal(method: string, params: any) {
    //console.log('use jrpc', method);
    return await this.collectionInpageProvider.methods[method](params).call();
  }

  async indexCodeHash(): Promise<string> {
    return (await this.runLocal('indexCodeHash', { answerId: 0 })).hash;
  }

  async indexCode(): Promise<string> {
    return (await this.runLocal('indexCode', { answerId: 0 })).code;
  }

  async getJson(): Promise<string> {
    try {
      return (await this.runLocal('getJson', { answerId: 0 })).json;
    } catch (e) {
      return null;
    }
  }

  async checkAccountExist(nftAddress: string): Promise<boolean> {
    try {
      const state = await this.rpcProvider.getFullContractState({
        address: new Address(nftAddress),
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

  async sendTransactionFromWallet(
    gasFee: number,
    flags: number,
    method: string,
    params: any,
  ) {
    console.log('use jrpc', method);
    console.log(params)
    console.log(gasFee)
    const res = await this.collectionInpageProvider.methods[method](
      params,
    ).send({
      from: new Address(
        this.evernet === EvernetType.MAIN
          ? MAINNET_ADDRESSES.Wallet
          : DEVNET_ADDRESSES.Wallet,
      ),
      amount: gasFee.toString(),
      bounce: true,
      //flags,
    });

    // const payload = {
    //   abi: JSON.stringify(UserProfileRootAbiAsConst),
    //   method: method,
    //   params
    // };
    
    // // Use provider.sendMessage to send an internal message
    // // with the specified sender, recipient, amount, bounce flag, and payload
    // const res = await this.rpcProvider.sendMessage({
    //   sender: new Address(
    //     this.evernet === EvernetType.MAIN
    //       ? MAINNET_ADDRESSES.Wallet
    //       : DEVNET_ADDRESSES.Wallet),
    //   recipient: new Address(
       
    //       DEVNET_ADDRESSES.UserProfileRoot),
    //   amount: gasFee.toString(), // 1 Native coin
    //   bounce: true,
    //   payload: payload,
    // });
    console.log('sended', res)
    return res;
  }
}
