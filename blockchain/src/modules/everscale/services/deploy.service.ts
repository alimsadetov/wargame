import { ConfigService } from '@nestjs/config';
import { Address, Contract, GetExpectedAddressParams, ProviderRpcClient } from 'everscale-inpage-provider';
import { BaseContractService } from './base-contract.service';
import { GameAbi, GameContractTvc } from '../abi/Game.abi';
import { DEVNET_WALLET_ADDRESS } from 'src/config/everscale.config';
import { SimpleKeystore } from 'everscale-standalone-client';

export class DeployService extends BaseContractService {
  protected rpcProvider: ProviderRpcClient;
  protected collectionInpageProvider: Contract<typeof GameAbi>;

  constructor(
    protected readonly configService: ConfigService,
  ) {
    super(configService)
  }

  async deployGameContract(gamerAddress: string){
    this.initBase()
    type DeployParams<Abi> = GetExpectedAddressParams<Abi> & {
      publicKey: string | undefined;
    };

    const keyPair = SimpleKeystore.generateKeyPair();
    const deployParams: DeployParams<typeof GameAbi> = {
      tvc: GameContractTvc,
      workchain: 0,
      publicKey: keyPair.publicKey,
      initParams: {
        nonce: (Math.random() * 64000).toFixed(),
      },
    };

    const expectedAddress = await this.rpcProvider.getExpectedAddress(
      GameAbi,
      deployParams,
    );
    console.log(expectedAddress)

    const stateInit = await this.rpcProvider.getStateInit(GameAbi, deployParams);

    await this.rpcProvider.sendMessage({
      sender: this.configService.get(DEVNET_WALLET_ADDRESS),
      recipient: expectedAddress,
      amount: (1 * 10 ** 9).toString(),
      bounce: false,
      stateInit: stateInit.stateInit,
    });

    const exampleContract: Contract<typeof GameAbi> = new this.rpcProvider.Contract(
      GameAbi,
      expectedAddress,
    );

    return await exampleContract.methods
      .constructor({
        bot: new Address(this.configService.get(DEVNET_WALLET_ADDRESS)),
        gamer: new Address(gamerAddress)
      })
      .sendExternal({
        stateInit: stateInit.stateInit,
        publicKey: deployParams.publicKey!,
      });
  }
}
