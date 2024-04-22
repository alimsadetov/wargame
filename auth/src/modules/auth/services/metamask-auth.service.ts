import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SecureService } from '../../secure/secure.service';
import { ADDRESS_RECOVERY_ERROR, MISMATCHED_ADDRESSES_ERROR } from '../constants/auth.errors';
import { LoginMetamaskDto } from '../dto/login-with-wallet.dto';
import { AuthService } from './auth.service';
import { MetamaskWalletNonceService } from './metamask-wallet-nonce.service';

@Injectable()
export class MetamaskAuthService {
  private readonly NONCE_MESSAGE_PREFIX = 'Nonce: ';

  constructor(
    private readonly secureService: SecureService,
    private readonly authService: AuthService,
    private readonly metamaskWalletNonceService: MetamaskWalletNonceService,
  ) {}

  async login(loginDto: LoginMetamaskDto, values: { userAgent: string; ipAddress: string }) {
    await this.checkAddress(loginDto.walletAddress, loginDto.signature);

    return true;
  }

  async generateNonceMessage(walletAddress: string): Promise<string> {
    const nonce = await this.metamaskWalletNonceService.generateNonce(walletAddress);
    return this.getNonceMessage(nonce);
  }

  private async checkAddress(walletAddress: string, signature: string): Promise<void> {
    const nonce = await this.metamaskWalletNonceService.deleteNonce(walletAddress);
    const nonceMessage: string = this.getNonceMessage(nonce);
    let verificationStatus = false;
    try {
      verificationStatus = this.secureService.verifySignature(walletAddress, signature, nonceMessage);
    } catch {
      throw new UnauthorizedException(ADDRESS_RECOVERY_ERROR);
    }
    if (!verificationStatus) {
      throw new UnauthorizedException(MISMATCHED_ADDRESSES_ERROR);
    }
  }

  private getNonceMessage(nonce: number): string {
    return `${this.NONCE_MESSAGE_PREFIX}${nonce}`;
  }
}
