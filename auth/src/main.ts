import { ConfigService } from '@nestjs/config';
import 'dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { CustomLoggerService } from './logger/custom-logger.service';
import { ValidationPipe } from './pipes/validation.pipe';
import { PORT, RMQ_URL, SERVER_PATH } from './config/global.config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Logger for app
  const logger = new CustomLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('auth-service');

  const configService = app.get(ConfigService);

  // Swagger setup
  const docConfig = new DocumentBuilder()
    .setTitle('auth-service')
    .setDescription('Here we can find all API methods of auth-service project')
    .setVersion('0.01')
    .addBearerAuth()
    .addServer(configService.get(SERVER_PATH))
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('auth-service/api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: 0, docExpansion: 'none' },
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get(PORT);
  const rmqUrl = configService.get(RMQ_URL);

  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: 'dequity-auth',
      queueOptions: {
        durable: false,
      },
    },
    logger: logger,
  });

  microservice.useGlobalFilters();
  await app.startAllMicroservices();

  logger.log('Ready to accept RMQ messages from queue wb-parser', 'Bootstrap');

  await app.listen(port, () => {
    logger.log(`App has started on port ${port}.`, 'Bootstrap');
  });
}
bootstrap();
