import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ACCESS_SECRET } from '../config/global.config';
import { IUser } from './user.interface';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ACCESS_SECRET),
    });
  }

  validate(payload: IUser): IUser {
    return {
      id: payload.id,
      login: payload.login,
      roles: payload.roles,
      evernet: payload.evernet,
    };
  }
}
