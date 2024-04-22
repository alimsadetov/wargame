import * as path from 'path';

export const PORT = 'PORT';
export const ACCESS_SECRET = 'ACCESS_SECRET';
export const EMAIL_ENCRYPTION_SECRET = 'EMAIL_ENCRYPTION_SECRET';
export const REFRESH_SECRET = 'REFRESH_SECRET';
export const ACCESS_TOKEN_DURATION = '5h';
export const REFRESH_TOKEN_DURATION = '7d';
export const SALT_ROUNDS = 10;
export const APP_ROOT = path.resolve(__dirname, '..', '..');
export const STATIC_DIR = path.resolve(APP_ROOT, 'static');
export const PROTOCOL_STR = 'PROTOCOL_STR';
export const DOMAIN_STR = 'DOMAIN_STR';
export const TRAVELLINE_API_KEY = 'TRAVELLINE_API_KEY';
export const BNOVO_EMAIL = 'BNOVO_EMAIL';
export const BNOVO_PASSWORD = 'BNOVO_PASSWORD';
export const BNOVO_ACCOUNT_ID = 'BNOVO_ACCOUNT_ID';
export const BNOVO_OTA_ID = 'BNOVO_OTA_ID';
export const RESET_PASSWORD_BASE_URL = 'RESET_PASSWORD_BASE_URLL';
export const CREATE_BOOKING_BASE_URL = 'CREATE_BOOKING_BASE_URL';
export const CANCEL_BOOKING_BASE_URL = 'CANCEL_BOOKING_BASE_URL';
export const HOTEL_BASE_URL = 'HOTEL_BASE_URL';

export default () => ({
  [PORT]: process.env[PORT] || 3003,
  [ACCESS_SECRET]: process.env[ACCESS_SECRET] || 'ACCESS_SECRET',
  [EMAIL_ENCRYPTION_SECRET]: process.env[EMAIL_ENCRYPTION_SECRET] || 'Hotelssecret_1337',
  [ACCESS_TOKEN_DURATION]: process.env[ACCESS_TOKEN_DURATION] || '1h',
  [REFRESH_SECRET]: process.env[REFRESH_SECRET] || 'REFRESH_SECRET',
  [REFRESH_TOKEN_DURATION]: process.env[REFRESH_TOKEN_DURATION] || '14d',

});
