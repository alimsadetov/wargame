import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { DeleteResult, Repository } from 'typeorm';
import { ACCESS_SECRET, ACCESS_TOKEN_DURATION, REFRESH_SECRET } from '../../../config/global.config';
import { RefreshToken } from '../entities/refresh-tokens.entity';
import { User } from '../entities/user.entity';
import { LoginResponceDto } from '../dto/login-responce.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async deleteRefreshToken(tokenId: number): Promise<DeleteResult> {
    return this.refreshTokenRepository.delete(tokenId);
  }

  async retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
    let decoded: string | JwtPayload = this.verifyRefreshToken(refreshStr, REFRESH_SECRET);
    if (typeof decoded === 'string' || decoded === undefined) {
      decoded = this.verifyRefreshToken(refreshStr, REFRESH_SECRET);
      if (typeof decoded === 'string' || decoded === undefined) {
        return undefined;
      }
    }
    return this.refreshTokenRepository.findOne({
      where: {
        id: decoded.id,
      },
      relations: ['user'],
    });
  }

  async newRefreshAndAccessToken(user: User, values: { userAgent: string; ipAddress: string }): Promise<LoginResponceDto> {
    const refreshObject = this.refreshTokenRepository.create({
      user: user,
      ...values,
    });
    await this.refreshTokenRepository.save(refreshObject);

    return {
      refreshToken: this.signNewRefreshToken(refreshObject),
      accessToken: this.signNewAccessToken(user),
    };
  }

  private verifyRefreshToken(refreshStr: string, secret_key: string): string | JwtPayload {
    try {
      const decoded = verify(refreshStr, this.configService.get(secret_key));
      return decoded;
    } catch (e) {
      return undefined;
    }
  }

  private signNewRefreshToken(refreshToken: RefreshToken) {
    return sign({ ...refreshToken, userId: refreshToken.user.id }, this.configService.get(REFRESH_SECRET));
  }

  private signNewAccessToken(user: User) {
    return sign(
      {
        id: user.id,
        login: user.login,
        roles: user.roles,
        addresses: user.wallets?.map((wallet) => wallet.address),
        evernet: user.userEvernet.evernet,
        canEarlyPurchase: user.canEarlyPurchase,
      },
      this.configService.get(ACCESS_SECRET),
      {
        expiresIn: this.configService.get(ACCESS_TOKEN_DURATION),
      },
    );
  }
}
