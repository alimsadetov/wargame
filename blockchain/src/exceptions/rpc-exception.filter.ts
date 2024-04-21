import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CustomLoggerService } from '../logger/custom-logger.service';

const logger = new CustomLoggerService();

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const err = exception.getError();

    logger.log(err);
    return null;
  }
}
