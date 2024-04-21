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
    .setTitle('dequity-blockchain')
    .setDescription('Here we can find all API methods of dequity blockchain')
    .setVersion('0.01')
    .addBearerAuth()
    .addServer(configService.get(SERVER_PATH))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('blockchain-service/api', app, document, {
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
      queue: 'dequity-blockchain',
      queueOptions: {
        durable: false,
      },
    },
    logger: logger,
  });

  microservice.useGlobalFilters();
  await app.startAllMicroservices();

  await app.listen(port, () => {
    logger.log(`App has started on port ${port}.`, 'Bootstrap');
  });
}
bootstrap();
