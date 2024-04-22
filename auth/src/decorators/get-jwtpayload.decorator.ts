import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.type';

export const GetJwtPayload = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const user = context.switchToHttp().getRequest().user;
    if (!user) return null;
    if (!data) return user;
    return user[data];
  },
);

export const GetWsJwtPayload = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext): JwtPayload | JwtPayload[keyof JwtPayload] => {
    //const user = context.switchToHttp().getRequest().user;
    const user = context.switchToWs().getClient().user;
    if (!user) return null;
    if (!data) return user;
    return user[data];
  },
);
