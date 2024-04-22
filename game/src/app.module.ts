import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globals, { STATIC_DIR } from './config/global.config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/log-incoming-request.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';
import { NotAuthStrategy } from './strategies/not-auth.strategy';
import { CustomLoggerService } from './logger/custom-logger.service';
import { DatabaseModule } from './modules/database/database.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [globals],
      isGlobal: true,
    }),

    LoggerModule,
    DatabaseModule,

  ],
  controllers: [],
  providers: [JwtStrategy, RefreshTokenStrategy, NotAuthStrategy, CustomLoggerService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
