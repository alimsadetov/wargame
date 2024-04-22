import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/custom-logger.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { PORT } from './config/global.config';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
//npx prisma migrate resolve --rolled-back '20240325130609_upd_partner' &&
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(new CustomLoggerService());
  const logger = app.get(CustomLoggerService);
  const configService = app.get(ConfigService);
  const origin: RegExp[] = configService
    .get<string>('CORS_ORIGIN_CONFIG')
    ?.split('\n')
    .map((item: string): RegExp => new RegExp(item));
  if (!origin) logger.warn('Не удалось прочитать CORS_ORIGIN_CONFIG');
  app.enableCors({ origin, credentials: true });
  app.setGlobalPrefix('game');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Game API')
    .setDescription(
      `<h2>Обозначения роутов:</h2>
    `,
    )
    .setVersion('0.01')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt-refresh')
    .addCookieAuth()
    .addCookieAuth('auth-cookie', { type: 'apiKey', in: 'cookie' }, 'access_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('game/api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: 0, docExpansion: 'none' },
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter));
  app.use(cookieParser());

  const port = configService.get(PORT);
  await app.listen(port, () => {
    logger.log(`App has started on port ${port}.`, 'Bootstrap');
  });
}
bootstrap();
