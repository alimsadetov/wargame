import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { SecureService } from '../../utils/secure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-tokens.entity';
import { EverWalletService } from './services/everwallet.service';
import { EverWallet } from './entities/everwallet.entity';
import { MetamaskWalletNonce } from './entities/metamask-wallet-nonce.entity';
import { MetamaskAuthService } from './services/metamask-auth.service';
import { MetamaskWalletNonceService } from './services/metamask-wallet-nonce.service';
import { SecureModule } from '../secure/secure.module';
import { RolesModule } from '../roles/roles.module';
import { AuthInternalController } from './controllers/auth.internal-controller';
import { TokenService } from './services/token.service';
import { SumsubService } from './services/sumsub.service';
import { TorusService } from './services/torus.service';
import { UserEvernet } from './entities/user-evernet.entity';
import { UserEvernetService } from './services/user-evernet.service';
import { ContractsModule } from '../contracts/contracts.module';
import { SendingTestTokens } from './entities/sending-test-tokens.entity';
import { DBService } from './services/db.service';
import { DBController } from './controllers/db.controller';
import { MailModule } from '../mail/mailing.module';
import { UserMailingService } from './services/mailing.servie';
import { MailingEntity } from './entities/mailing.entity';
import { MailingController } from './controllers/mailing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, EverWallet, MetamaskWalletNonce, UserEvernet, SendingTestTokens, MailingEntity]),
    ConfigModule,
    SecureModule,
    RolesModule,
    ContractsModule,
    MailModule,
  ],
  controllers: [AuthController, AuthInternalController, DBController, MailingController],
  providers: [
    AuthService,
    UserService,
    SecureService,
    EverWalletService,
    MetamaskAuthService,
    MetamaskWalletNonceService,
    TokenService,
    SumsubService,
    TorusService,
    UserEvernetService,
    DBService,
    UserMailingService,
  ],
})
export class AuthModule {}
