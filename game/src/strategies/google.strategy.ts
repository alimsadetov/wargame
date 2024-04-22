import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URL, GOOGLE_SECRET } from '../config/ouath.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get(GOOGLE_CLIENT_ID),
      clientSecret: configService.get(GOOGLE_SECRET),
      callbackURL: configService.get(GOOGLE_REDIRECT_URL),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      accessToken,
      email: profile?.emails?.at(0)?.value,
    };
    done(null, user);
  }
}
