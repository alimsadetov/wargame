import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponceDto } from '../dto/login-responce.dto';
import { TonClient } from '@eversdk/core';
import { libNode } from '@eversdk/lib-node';
import { ConfigService } from '@nestjs/config';
import { EVERSCALE_ENDPOINT } from '../../../config/global.config';
import { EverWallet } from '../entities/everwallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { ContractsService } from '../../contracts/contracts.service';
import { SendingTestTokens } from '../entities/sending-test-tokens.entity';
import { EvernetType } from '../types/evernet.type';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client/nodejs';

@Injectable()
export class EverWalletService {
  client: ProviderRpcClient = null;
  constructor(
    @InjectRepository(EverWallet)
    private readonly walletRep: Repository<EverWallet>,
    @InjectRepository(SendingTestTokens)
    private readonly sendingTestTokensRep: Repository<SendingTestTokens>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly contractsService: ContractsService,
  ) {
    TonClient.useBinaryLibrary(libNode);
  }

  private async connectClient() {
    const client = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () =>
        EverscaleStandaloneClient.create({
          connection: {
            id: 1000,
            group: 'venom_testnet',
            type: 'jrpc',
            data: {
              endpoint: this.configService.get(EVERSCALE_ENDPOINT),
            },
          },
          initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
        }),
    });
    this.client = client;
  }

  private async closeClient() {
    this.client.disconnect();
  }

  async checkSinature(publicKey: string, signature: string, nonce: string) {
    let isValidSignature = false;
    this.connectClient();
    try {
      const isValid = await this.client.verifySignature({
        publicKey: publicKey,
        signature: signature,
        dataHash: nonce,
      });
      if (isValid?.isValid) isValidSignature = true;
    } catch (ex) {
      isValidSignature = false;
    }
    this.closeClient();
    return isValidSignature;
  }

  async findOneByAddress(address: string): Promise<EverWallet | null> {
    const wallet = await this.walletRep.findOne({ where: { address } });
    return wallet;
  }

  async createWallet(address: string, publicKey: string): Promise<EverWallet> {
    const wallet = new EverWallet({ address, publicKey });
    const user = await this.userService.findOrcreateUserForWallet(address);
    wallet.userId = user.id;
    wallet.sendingTestTokens = null;
    await this.walletRep.insert(wallet);
    return wallet;
  }

  async login(
    address: string,
    publicKey: string,
    signature: string,
    nonce: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<LoginResponceDto> {
    const isVerified = await this.checkSinature(publicKey, signature, nonce);
    if (!isVerified) {
      throw new UnauthorizedException();
    }
    let wallet = await this.walletRep.findOne({ where: { address }, relations: { sendingTestTokens: true } });
    if (!wallet) {
      wallet = await this.createWallet(address, publicKey);
    }

    const user = await this.userService.findOneById(wallet.userId);
    user.loginType = 'everwallet';
    await user.save();

    if (!wallet?.sendingTestTokens && user?.userEvernet?.evernet === EvernetType.DEV) {
      try {
        this.sendTestTokensForNewWallet(wallet.address);
        await this.sendingTestTokensRep.save({ everwalletId: wallet.id });
      } catch (e) {}
    }
    return this.tokenService.newRefreshAndAccessToken(user, values);
  }

  async changeSelfWallet(userId: number, newAddress: string, publicKey: string): Promise<EverWallet> {
    const foundWallet = await this.walletRep.findOne({ where: { userId } });
    if (foundWallet) {
      foundWallet.address = newAddress;
      foundWallet.publicKey = publicKey;
      this.walletRep.save(foundWallet);
    }
    return foundWallet;
  }

  async sendTestTokensToWalletsWithNotSendedTestTokens(filter: 'all' | 'not_sended' = 'not_sended'): Promise<boolean> {
    if (filter === 'all') {
      const foundWallets = await this.walletRep.find({ select: { address: true } });
      for (let wallet of foundWallets) {
        try {
          await this.sendTestTokensForNewWallet(wallet.address);
        } catch (e) {}
      }
      return true;
    }
    const foundWallets = await this.walletRep.find({ where: { sendingTestTokens: { id: Not(IsNull()) } }, select: { address: true } });
    for (let wallet of foundWallets) {
      try {
        await this.sendTestTokensForNewWallet(wallet.address);
      } catch (e) {}
    }
    return true;
  }

  async sendTestTokensForNewWallet(userWalletAddress: string) {
    await this.contractsService.sendTestTokensForUserWallet(userWalletAddress);
  }
}
