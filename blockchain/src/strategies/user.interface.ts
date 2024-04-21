import { EvernetType } from '../modules/everscale/types/evernet.type';
import { RoleEnum } from './role.enum';

export interface IUser {
  id: number;
  login: string;
  roles: { id: string; value: RoleEnum; description: string }[];
  evernet: EvernetType;
}
