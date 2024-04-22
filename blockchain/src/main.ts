import 'dotenv';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { CustomLoggerService } from './logger/custom-logger.service';
import { ValidationPipe } from './pipes/validation.pipe';
import { Transport } from '@nestjs/microservices';
import { PORT, RMQ_URL, SERVER_PATH } from './config/global.config';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

async function bootstrap() {
  // Logger for app
  const logger = new CustomLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.enableCors();
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('blockchain');

  const configService = app.get(ConfigService);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('blockchain')
    .setDescription('Here we can find all API methods of blockchain')
    .setVersion('0.01')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('blockchain-service/api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: 0, docExpansion: 'none' },
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get(PORT);

  await app.listen(port, () => {
    logger.log(`App has started on port ${port}.`, 'Bootstrap');
  });
}
bootstrap();
