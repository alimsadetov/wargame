export const DEVNET_EVER_ENDPOINT = 'DEVNET_EVER_ENDPOINT';
export const DEVNET_WALLET_ADDRESS = 'DEVNET_WALLET_ADDRESS';
export const DEVNET_WALLET_PUBLIC_KEY = 'DEVNET_WALLET_PUBLIC_KEY';
export const DEVNET_WALLET_PRIVATE_KEY = 'DEVNET_WALLET_PRIVATE_KEY';

export default () => ({
  [DEVNET_EVER_ENDPOINT]:
    process.env[DEVNET_EVER_ENDPOINT] ||
    'https://venom-testnet.evercloud.dev/5496121f177e049f75f1f70063d052/graphql',
  [DEVNET_WALLET_PUBLIC_KEY]:
    process.env[DEVNET_WALLET_PUBLIC_KEY] ||
    'd76d531ca7ce3fa7236c2b63f0dce1f157fc35e8f049f9819595c1d0dd',
  [DEVNET_WALLET_PRIVATE_KEY]:
    process.env[DEVNET_WALLET_PRIVATE_KEY] ||
    '813457914aca71e26b0182c5fe23345f55bce6042bac2702700ec851e',
  [DEVNET_WALLET_ADDRESS]:
    process.env[DEVNET_WALLET_ADDRESS] ||
    '0:01cde3d4443b6c45212e82c5366d11cd00bf6ab1ff3b183a211879e0a2058eaf',
});
