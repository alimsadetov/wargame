import { ValidationException } from '../exceptions/validation.exception';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

const MAX_TIMEOUT = 60000;

export abstract class BaseMessageService {
  protected readonly MAX_TIMEOUT: number = 5000;

  constructor(protected proxyClient: ClientProxy) {}
  async send(message: object, pattern: any): Promise<any> {
    const data = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();
    let answer;
    try {
      answer = await lastValueFrom(
        this.proxyClient.send(pattern, data).pipe(timeout(this.MAX_TIMEOUT)),
      );
    } catch (error) {
      if (error.name == 'ValidationException') {
        let response = error.response;
        if (!response) {
          response = error.message;
        } else if (!response.length) {
          response = [response];
        }
        throw new ValidationException(response);
      }
      throw error;
    }
    // if (answer == null) {
    //   throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR); // переписать
    // }
    return answer;
  }
}
