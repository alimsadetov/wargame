import { ConfigService } from '@nestjs/config';
import {
  DEVNET_WALLET_PRIVATE_KEY,
  DEVNET_WALLET_PUBLIC_KEY,
} from '../../../config/everscale.config';
import { DEVNET_ADDRESSES } from '../abi/addresses';
import {
  EverscaleStandaloneClient,
  EverWalletAccount,
  SimpleAccountsStorage,
  SimpleKeystore,
} from 'everscale-standalone-client/nodejs';
import { Address, ProviderRpcClient} from 'everscale-inpage-provider';

export class Blockchain {
  private static instance: Blockchain;

  private provider: ProviderRpcClient;

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
    return this.provider;
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

    const acc = new EverWalletAccount(accAddress);


    const accountsStorage = new SimpleAccountsStorage();
    accountsStorage.addAccount(acc);
    accountsStorage.defaultAccount = accAddress;

    this.provider = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () =>
        EverscaleStandaloneClient.create({
          
          connection: {
            id: 10000,
            group: 'devnet',
            type: 'graphql',
            data: {
              endpoints: ['https://devnet.evercloud.dev/89a3b8f46a484f2ea3bdd364ddaee3a3/graphql'],
            },
          },
          keystore: keystore,
          accountsStorage: accountsStorage,
        }),
    });


  } catch(e){console.log('error on init')}
  }
}
