import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponceDto } from '../dto/login-responce.dto';
import { UserService } from './user.service';
import * as jose from 'jose';
import { LoginTorusDto } from '../dto/login-torus.dto';
import { EverWallet } from '../entities/everwallet.entity';
import { Repository } from 'typeorm';
import { EverWalletService } from './everwallet.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EvernetType } from '../types/evernet.type';
import { SendingTestTokens } from '../entities/sending-test-tokens.entity';

@Injectable()
export class TorusService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly everWalletService: EverWalletService,
    @InjectRepository(EverWallet)
    private readonly walletRep: Repository<EverWallet>,
    @InjectRepository(SendingTestTokens)
    private readonly sendingTestTokensRep: Repository<SendingTestTokens>,
  ) {}

  async login(loginDto: LoginTorusDto, values: { userAgent: string; ipAddress: string }): Promise<LoginResponceDto> {
    if (!(await this.validateToken(loginDto.token, loginDto.pubKey))) throw new UnauthorizedException('Not valid jwt');
    let wallet = await this.walletRep.findOne({ where: { address: loginDto.walletAddress }, relations: { sendingTestTokens: true } });
    if (!wallet) {
      wallet = await this.everWalletService.createWallet(loginDto.walletAddress, loginDto.pubKey);
    }
    const user = await this.userService.findOneById(wallet.userId);
    user.loginType = 'torus';
    await user.save();
    if (!wallet?.sendingTestTokens && user?.userEvernet?.evernet === EvernetType.DEV) {
      try {
        this.everWalletService.sendTestTokensForNewWallet(wallet.address);
        await this.sendingTestTokensRep.save({ everwalletId: wallet.id });
      } catch (e) {}
    }
    return this.authService.newRefreshAndAccessToken(user, values);
  }
  private async validateToken(token: string, pubKey: string): Promise<boolean> {
    const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));
    let jwtDecoded;
    try {
      jwtDecoded = await jose.jwtVerify(token, jwks, { algorithms: ['ES256'] });
    } catch (e) {
      return false;
    }

    return (jwtDecoded.payload as any).wallets[0].public_key === pubKey;
  }
}
