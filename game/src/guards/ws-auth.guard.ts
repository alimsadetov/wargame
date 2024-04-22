import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { $Enums } from '@prisma/client';
import { Request } from 'express';
import { ACCESS_SECRET } from 'src/config/global.config';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('start');
    try {
      const wsCtx = context.switchToWs().getClient();
      const cookie = wsCtx.handshake.headers.cookie as string;
      // wsCtx.user = {
      //   id: 1,
      //   role: $Enums.UserRole.ADMIN
      // }
      // return true

      const cookieSplitted = decodeURI(cookie).split('=');

      const foundAccessToken = cookieSplitted.find((item) => item === 'access_token');

      if (!foundAccessToken) {
        throw new WsException('Unauthorized');
      }

      const indexOfFoundAccessToken = cookieSplitted.indexOf(foundAccessToken);
      const accessTokenValue = cookieSplitted[indexOfFoundAccessToken + 1];
      const accessTokenValueSplitted = accessTokenValue.split(';');
      const accessTokenValuePure = accessTokenValueSplitted[0];

      console.log(accessTokenValuePure);

      try {
        const payload = await this.jwtService.verifyAsync(accessTokenValuePure, {
          secret: this.configService.get(ACCESS_SECRET) || 'ACCESS_SECRET',
        });
        if (!payload.id) {
          throw new UnauthorizedException();
        }
        wsCtx.user = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      throw new WsException('Unauthorized');
    }
  }
}
