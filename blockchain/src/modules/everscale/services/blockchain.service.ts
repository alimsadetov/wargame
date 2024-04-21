import { ConfigService } from '@nestjs/config';
import {
  DEVNET_EVER_PRIVATE_KEY,
  DEVNET_EVER_PUBLIC_KEY,
  DEVNET_WALLET_PRIVATE_KEY,
  DEVNET_WALLET_PUBLIC_KEY,
} from '../../../config/everscale.config';
import { DEVNET_ADDRESSES, MAINNET_ADDRESSES } from '../abi/addresses';
import {
  EverscaleStandaloneClient,
  MsigAccount,
  EverWalletAccount,
  SimpleAccountsStorage,
  SimpleKeystore,
} from 'everscale-standalone-client/nodejs';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';

export class Blockchain {
  private static instance: Blockchain;

  private providerDevnet: ProviderRpcClient;

  private constructor(private configService: ConfigService) {
    this.initClient();
  }

  public static getInstance(configService: ConfigService) {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain(configService);
    }
    return Blockchain.instance;
  }

  public getRpcProvider(): ProviderRpcClient {
    return this.providerDevnet;
  }

  private async initClient(): Promise<void> {
    try {
    const keystore = new SimpleKeystore({
      [this.configService.get(DEVNET_WALLET_PUBLIC_KEY)]: {
        publicKey: this.configService.get(DEVNET_WALLET_PUBLIC_KEY),
        secretKey: this.configService.get(DEVNET_WALLET_PRIVATE_KEY),
      }
    });



    const accAddress = new Address(DEVNET_ADDRESSES.Wallet);
    // const acc = new MsigAccount({
    //   address: accAddress,
    //   type: 'everwa',
    //   publicKey: this.configService.get(DEVNET_EVER_PUBLIC_KEY),
    // });

    const acc = new EverWalletAccount({
      address: accAddress,
      //type: 'everwa',
      publicKey: this.configService.get(DEVNET_EVER_PUBLIC_KEY),
    });


    const accountsStorage = new SimpleAccountsStorage();
    accountsStorage.addAccount(acc);
    accountsStorage.defaultAccount = accAddress;

    this.providerDevnet = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: async () =>
        EverscaleStandaloneClient.create({
          connection: {
            id: 1000,
            group: 'venom_testnet',
            type: 'jrpc',
            data: {
              endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
            },
          },
          keystore: keystore,
          accountsStorage: accountsStorage,
        }),
    });

  } catch(e){console.log('error on init')}
  }
}
