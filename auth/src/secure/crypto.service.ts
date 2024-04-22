var CryptoJS = require('crypto-js');
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  constructor() {}

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
  }

  decrypt(crypted: string) {
    var bytes = CryptoJS.AES.decrypt(crypted, 'secret key 123');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
