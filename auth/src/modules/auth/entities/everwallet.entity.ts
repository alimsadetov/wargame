import { Everwallet } from '@prisma/client';

export class EverwalletEntity implements Everwallet {
  id: number;
  userId: number;
  address: string;
  publicKey: string;
}
