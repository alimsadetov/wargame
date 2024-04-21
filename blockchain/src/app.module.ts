import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globals from './config/global.config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/log-incoming-request.middleware';

import { JwtStrategy } from './strategies/jwt.strategy';
import everscaleConfig from './config/everscale.config';
import { EverscaleModule } from './modules/everscale/everscale.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [
        globals,
        everscaleConfig,
      ],
      isGlobal: true,
    }),
    LoggerModule,
    EverscaleModule,
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
