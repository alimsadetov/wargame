import * as path from 'path';

export const PORT = 'PORT';
export const ACCESS_SECRET = 'ACCESS_SECRET';
export const EMAIL_ENCRYPTION_SECRET = 'EMAIL_ENCRYPTION_SECRET';
export const REFRESH_SECRET = 'REFRESH_SECRET';
export const ACCESS_TOKEN_DURATION = '5h';
export const REFRESH_TOKEN_DURATION = '7d';


export default () => ({
  [PORT]: process.env[PORT] || 3003,
  [ACCESS_SECRET]: process.env[ACCESS_SECRET] || 'ACCESS_SECRET',

});
