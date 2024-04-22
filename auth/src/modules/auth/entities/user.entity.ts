import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  login: string;
  passwordHash: string;
  createdAt: Date;
  role: $Enums.Role;
}
