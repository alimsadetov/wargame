import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globals from './config/global.config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/log-incoming-request.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [globals],
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
