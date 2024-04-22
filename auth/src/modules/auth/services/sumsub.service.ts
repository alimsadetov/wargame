import { ConfigService } from '@nestjs/config';
import { SUMSUB_ACCESS_TOKEN_ENDPOINT, SUMSUB_APP_SECRET, SUMSUB_APP_TOKEN } from './../../../config/global.config';
import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SumsubService {
  constructor(private readonly configService: ConfigService) {}

  async getSumsubAccessToken(userId: number): Promise<string> {
    const time = Math.floor(new Date().getTime() / 1000);
    const params = `${time}POST/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level`;
    let generated_signature = CryptoJS.HmacSHA256(params, this.configService.get(SUMSUB_APP_SECRET)).toString(CryptoJS.enc.Hex);
    const url = this.configService.get(SUMSUB_ACCESS_TOKEN_ENDPOINT);
    try {
      const res = await fetch(`${url}?userId=${userId}&levelName=basic-kyc-level`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-App-Token': this.configService.get(SUMSUB_APP_TOKEN),
          'X-App-Access-Sig': generated_signature,
          'X-App-Access-Ts': String(time),
        },
      });
      const result = await res.json();
      return await result.token;
    } catch (ex) {
      console.log(ex);
      throw new UnprocessableEntityException();
    }
  }
}
