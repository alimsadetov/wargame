import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard),  ApiCookieAuth('access_token'));
}
