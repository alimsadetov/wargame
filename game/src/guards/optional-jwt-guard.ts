import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ACCESS_SECRET } from 'src/config/global.config';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard(['jwt', 'not-auth']) implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      request.user = {};
      return true;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(ACCESS_SECRET) || 'ACCESS_SECRET',
      });
      request.user = payload;
    } catch {}
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const token: string = request.cookies.access_token;
    if (!token) {
      try {
        return request.headers.authorization.split(' ')[1];
      } catch {}
    }
    return token;
  }
}
