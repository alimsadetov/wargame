import { ConfigService } from '@nestjs/config';
import { ACCESS_SECRET, ACCESS_TOKEN_DURATION, REFRESH_SECRET } from './../../../config/global.config';
import { User } from './../entities/user.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { INVALID_REFRESH_TOKEN_ERROR, WRONG_PASSWOR_OR_LOGIN_ERROR } from '../constants/auth.errors';
import { LoginResponceDto } from '../dto/login-responce.dto';
import { UserService } from './user.service';
import { SecureService } from '../../../utils/secure.service';
import { ValidationException } from '../../../exceptions/validation.exception';
import { TokenService } from './token.service';
import { RefreshToken } from '../entities/refresh-tokens.entity';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly secureService: SecureService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async refresh(refreshStr: string, ipAddress: string, userAgent: string): Promise<LoginResponceDto | undefined> {
    const refreshToken = await this.tokenService.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      throw new UnprocessableEntityException(INVALID_REFRESH_TOKEN_ERROR);
    }

    const user = await this.userService.findOneById(refreshToken.user.id);
    if (!user) {
      throw new UnprocessableEntityException(INVALID_REFRESH_TOKEN_ERROR);
    }

    const newTokensPair = await this.tokenService.newRefreshAndAccessToken(user, {
      userAgent,
      ipAddress,
    });

    await this.tokenService.deleteRefreshToken(refreshToken.id);
    return newTokensPair;
  }

  async login(login: string, password: string, values: { userAgent: string; ipAddress: string }): Promise<LoginResponceDto> {
    const user = await this.userService.findOneByLogin(login);
    if (!user || !(await this.secureService.compare(password, user.passwordHash))) {
      throw new ValidationException(WRONG_PASSWOR_OR_LOGIN_ERROR, ['login', 'password']);
    }
    user.loginType = 'login';
    await user.save();
    return this.newRefreshAndAccessToken(user, values);
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

  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.tokenService.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      throw new UnprocessableEntityException(INVALID_REFRESH_TOKEN_ERROR);
    }
    this.tokenService.deleteRefreshToken(refreshToken.id);
  }
}
