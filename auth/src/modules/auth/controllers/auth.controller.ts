import { LoginDto } from '../dto/login.dto';
import { Body, Controller, Get, HttpCode, Ip, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import RefreshTokenDto from '../dto/refresh-token.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponceDto } from '../dto/login-responce.dto';
import { RegistrationDto } from '../dto/registration.dto';
import {
  ADDRESS_RECOVERY_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
  MISMATCHED_ADDRESSES_ERROR,
  PASSWORDS_MUST_MATCH_ERROR,
  USER_WITH_WALLET_ADDRESS_NOT_FOUND_ERROR,
} from '../constants/auth.errors';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { ValidationException } from '../../../exceptions/validation.exception';
import { JwtAuthGuard } from '../../../guards/jwt-guard';
import { EverWalletService } from '../services/everwallet.service';
import { ChangeEverWalletDto, EverWalletLoginDto } from '../dto/everwallet-login.dto';
import { IRequest } from '../../../guards/request.interface';
import { GenerateWalletNonce } from '../dto/generate-wallet-nonce.dto';
import { MetamaskAuthService } from '../services/metamask-auth.service';
import { LoginMetamaskDto } from '../dto/login-with-wallet.dto';
import { Param, Put } from '@nestjs/common/decorators';
import { SumsubService } from '../services/sumsub.service';
import { TorusService } from '../services/torus.service';
import { LoginTorusDto } from '../dto/login-torus.dto';
import { EverWallet } from '../entities/everwallet.entity';
import { UserEvernetService } from '../services/user-evernet.service';
import { UserEvernet } from '../entities/user-evernet.entity';
import { EvernetType } from '../types/evernet.type';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly everwalletService: EverWalletService,
    private readonly metamaskAuthService: MetamaskAuthService,
    private readonly sumsubService: SumsubService,
    private readonly torusService: TorusService,
    private readonly userEvernetService: UserEvernetService,
  ) {}

  @ApiOperation({ summary: 'Получить пользователя.' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: User })
  @Get('me')
  async geCurrentUser(@Req() { user }: IRequest): Promise<User> {
    return this.userService.findOneById(user.id);
  }

  @ApiOperation({ summary: 'Установить evernet для пользователя' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: LoginResponceDto })
  @ApiBearerAuth()
  @Put('set-evernet-for-user/:evernet')
  async setEvernetForUser(
    @Req() { user }: IRequest,
    @Param('evernet') evernet: EvernetType,
    @Body() { refreshToken }: RefreshTokenDto,
    @Ip() ip: string,
    @Req() { headers }: Request,
  ): Promise<LoginResponceDto | undefined> {
    return await this.userEvernetService.setEvernetForUser(user.id, evernet, refreshToken, ip, headers['user-agent']);
  }

  @ApiOperation({ summary: 'Получить access token для sumsub' })
  @ApiResponse({ status: 201, type: String })
  @Get('sumsub/get-access-token/:user_id')
  async getSumsubAccessToken(@Param('user_id') userId: number): Promise<string> {
    return this.sumsubService.getSumsubAccessToken(userId);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация ewerwallet.' })
  @ApiResponse({ status: 201, type: LoginResponceDto })
  @Post('everwallet-login')
  async everWalletLogin(
    @Req() { headers }: Request,
    @Ip() ip: string,
    @Body() everWalletLogin: EverWalletLoginDto,
  ): Promise<LoginResponceDto> {
    return this.everwalletService.login(
      everWalletLogin.address,
      everWalletLogin.publicKey,
      everWalletLogin.signature,
      everWalletLogin.nonce,
      {
        ipAddress: ip,
        userAgent: headers['user-agent'],
      },
    );
  }

  @ApiOperation({ summary: 'Сменить кошелёк everwallet.' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: EverWallet })
  @Put('everwallet/change-self-wallet')
  async everWalletChangeSelfWallet(@Req() { user }: IRequest, @Body() changeWalletDto: ChangeEverWalletDto): Promise<EverWallet> {
    return this.everwalletService.changeSelfWallet(user.id, changeWalletDto.newAddress, changeWalletDto.publicKey);
  }

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Generate nonce message to sign' })
  @ApiResponse({ status: 200, type: String })
  @Post('metamask/nonce')
  generateNonceMessage(@Body() generateWalletNonce: GenerateWalletNonce): Promise<string> {
    return this.metamaskAuthService.generateNonceMessage(generateWalletNonce.walletAddress);
  }

  @ApiOperation({ summary: 'Авторизация через torus.' })
  @ApiResponse({ status: 200, type: String })
  @Post('torus/login')
  torusLogin(@Req() { headers }: Request, @Ip() ip: string, @Body() loginTorusDto: LoginTorusDto): Promise<LoginResponceDto> {
    return this.torusService.login(loginTorusDto, {
      ipAddress: ip,
      userAgent: headers['user-agent'],
    });
  }

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'User authentication using wallet' })
  @ApiResponse({ status: 201, type: LoginResponceDto })
  @ApiResponse({
    status: 401,
    description: ADDRESS_RECOVERY_ERROR,
  })
  @ApiResponse({
    status: 401,
    description: MISMATCHED_ADDRESSES_ERROR,
  })
  @ApiResponse({
    status: 404,
    description: USER_WITH_WALLET_ADDRESS_NOT_FOUND_ERROR,
  })
  @Post('metamask/login')
  loginByMetamask(@Req() { headers }: Request, @Ip() ip: string, @Body() loginDto: LoginMetamaskDto) {
    return this.metamaskAuthService.login(loginDto, {
      ipAddress: ip,
      userAgent: headers['user-agent'] || '',
    });
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация без использования кошелька.' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @Post('login')
  async login(@Req() { headers }: Request, @Ip() ip: string, @Body() { login, password }: LoginDto): Promise<LoginResponceDto> {
    return this.authService.login(login, password, {
      ipAddress: ip,
      userAgent: headers['user-agent'],
    });
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя.' })
  @ApiResponse({ status: 201, type: User })
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto): Promise<User> {
    if (registrationDto.password !== registrationDto.passwordConfirm) {
      throw new ValidationException(PASSWORDS_MUST_MATCH_ERROR, ['password', 'passwordConfirm']);
    }
    return this.userService.createUser(registrationDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Обновить токены авторизации.' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @ApiResponse({ status: 422, description: INVALID_REFRESH_TOKEN_ERROR })
  @Post('refresh')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto, @Ip() ip: string, @Req() { headers }: Request): Promise<LoginResponceDto> {
    return this.authService.refresh(refreshToken, ip, headers['user-agent']);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout.' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 422, description: INVALID_REFRESH_TOKEN_ERROR })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() { refreshToken }: RefreshTokenDto): Promise<void> {
    return this.authService.logout(refreshToken);
  }

  @ApiExcludeEndpoint()
  @HttpCode(200)
  @ApiOperation({ summary: 'Send test tokens for wallets' })
  @ApiResponse({ status: 200, type: LoginResponceDto })
  @Post('send-test-tokens-for-wallets/:filter')
  async sendTestTokensToWalletsWithNotSendedTestTokens(@Param('filter') filter: 'all' | 'not_sended'): Promise<boolean> {
    return this.everwalletService.sendTestTokensToWalletsWithNotSendedTestTokens(filter);
  }
}
