export const WalletAbi = {
  'ABI version': 2,
  version: '2.3',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'sendTransaction',
      inputs: [
        { name: 'dest', type: 'address' },
        { name: 'value', type: 'uint128' },
        { name: 'bounce', type: 'bool' },
        { name: 'flags', type: 'uint8' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'sendTransactionRaw',
      inputs: [
        { name: 'flags', type: 'uint8' },
        { name: 'message', type: 'cell' },
      ],
      outputs: [],
    },
  ],
  data: [],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
  ],
} as const;
