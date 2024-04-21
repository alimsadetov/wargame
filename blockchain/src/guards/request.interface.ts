import { IUser } from '../strategies/user.interface';

export interface IRequest {
  err?: any;
  user: IUser;
  info: any;
  context: any;
  status: any;
}
