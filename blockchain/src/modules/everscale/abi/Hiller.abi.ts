export const HillerAbi = {
  'ABI version': 2,
  version: '2.3',
  header: ['time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [],
      outputs: [],
    },
    {
      name: 'getHp',
      inputs: [],
      outputs: [{ name: 'memory', type: 'int256' }],
    },
    {
      name: 'getUnitType',
      inputs: [],
      outputs: [{ name: 'memory', type: 'string' }],
    },
    {
      name: 'getIsHillAvail',
      inputs: [],
      outputs: [{ name: 'memory', type: 'bool' }],
    },
    {
      name: 'getIsDead',
      inputs: [],
      outputs: [{ name: 'memory', type: 'bool' }],
    },
    {
      name: 'takeAttack',
      inputs: [{ name: 'attackerPower', type: 'uint256' }],
      outputs: [],
    },
    {
      name: 'checkDeath',
      inputs: [],
      outputs: [],
    },
    {
      name: 'heal',
      inputs: [{ name: 'hillingAmount', type: 'uint256' }],
      outputs: [],
    },
    {
      name: 'unitType',
      inputs: [],
      outputs: [{ name: 'unitType', type: 'string' }],
    },
    {
      name: 'hp',
      inputs: [],
      outputs: [{ name: 'hp', type: 'int256' }],
    },
    {
      name: 'attackPower',
      inputs: [],
      outputs: [{ name: 'attackPower', type: 'uint256' }],
    },
    {
      name: 'protectionPower',
      inputs: [],
      outputs: [{ name: 'protectionPower', type: 'uint256' }],
    },
    {
      name: 'hilling',
      inputs: [],
      outputs: [{ name: 'hilling', type: 'uint256' }],
    },
    {
      name: 'isHillAvail',
      inputs: [],
      outputs: [{ name: 'isHillAvail', type: 'bool' }],
    },
    {
      name: 'isDead',
      inputs: [],
      outputs: [{ name: 'isDead', type: 'bool' }],
    },
  ],
  data: [],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'unitType', type: 'string' },
    { name: 'hp', type: 'int256' },
    { name: 'attackPower', type: 'uint256' },
    { name: 'protectionPower', type: 'uint256' },
    { name: 'hilling', type: 'uint256' },
    { name: 'isHillAvail', type: 'bool' },
    { name: 'isDead', type: 'bool' },
  ],
} as const;
