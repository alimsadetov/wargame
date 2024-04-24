export const GameAbi = {
  'ABI version': 2,
  version: '2.3',
  header: ['time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [
        { name: 'gamer', type: 'address' },
        { name: 'bot', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getGamerAddress',
      inputs: [],
      outputs: [{ name: 'memory', type: 'address' }],
    },
    {
      name: 'getBotAddress',
      inputs: [],
      outputs: [{ name: 'memory', type: 'address' }],
    },
    {
      name: 'getGamerUnits',
      inputs: [],
      outputs: [{ name: 'memory', type: 'address[]' }],
    },
    {
      name: 'getBotUnits',
      inputs: [],
      outputs: [{ name: 'memory', type: 'address[]' }],
    },
    {
      name: 'getIsGamerMove',
      inputs: [],
      outputs: [{ name: 'memory', type: 'bool' }],
    },
    {
      name: 'getIsGameEnded',
      inputs: [],
      outputs: [{ name: 'memory', type: 'bool' }],
    },
    {
      name: 'changeUnits',
      inputs: [{ name: '_units', type: 'address[]' }],
      outputs: [],
    },
    {
      name: 'changeBotUnits',
      inputs: [{ name: '_units', type: 'address[]' }],
      outputs: [],
    },
    {
      name: 'changeIsGamerMove',
      inputs: [{ name: '_isGamerMove', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'endGame',
      inputs: [{ name: 'isGamerWins', type: 'bool' }],
      outputs: [],
    },
    {
      name: 'gamerAddress',
      inputs: [],
      outputs: [{ name: 'gamerAddress', type: 'address' }],
    },
    {
      name: 'botAddress',
      inputs: [],
      outputs: [{ name: 'botAddress', type: 'address' }],
    },
    {
      name: 'units',
      inputs: [],
      outputs: [{ name: 'units', type: 'address[]' }],
    },
    {
      name: 'botUnits',
      inputs: [],
      outputs: [{ name: 'botUnits', type: 'address[]' }],
    },
    {
      name: 'isGamerMove',
      inputs: [],
      outputs: [{ name: 'isGamerMove', type: 'bool' }],
    },
    {
      name: 'isGameEnded',
      inputs: [],
      outputs: [{ name: 'isGameEnded', type: 'bool' }],
    },
  ],
  data: [],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'gamerAddress', type: 'address' },
    { name: 'botAddress', type: 'address' },
    { name: 'units', type: 'address[]' },
    { name: 'botUnits', type: 'address[]' },
    { name: 'isGamerMove', type: 'bool' },
    { name: 'isGameEnded', type: 'bool' },
  ],
} as const;

export const GameContractTvc = "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"