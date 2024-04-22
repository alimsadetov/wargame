export const PORT = 'PORT';
export const SALT_ROUNDS = 'SALT_ROUNDS';
export const ACCESS_SECRET = 'ACCESS_SECRET';
export const ADMIN_USER_ID = 'ADMIN_USER_ID';
export const RMQ_URL = 'RMQ_URL';
export const IPFS_URL = 'IPFS_URL';
export const SERVER_PATH = 'SERVER_PATH';

export default () => ({
  [PORT]: process.env[PORT] || 3000,
  [SERVER_PATH]: process.env[SERVER_PATH] || 'http://localhost:3000',
  [ACCESS_SECRET]: process.env[ACCESS_SECRET] || 'ACCESS_SECRET',
  [RMQ_URL]: process.env['RMQ_URL'] || 'amqp://localhost:5672',
  [IPFS_URL]: process.env['IPFS_URL'] || 'http://127.0.0.1:8080',
});
