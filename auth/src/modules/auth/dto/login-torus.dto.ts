import { IsString } from 'class-validator';

export class LoginTorusDto {
  @IsString()
  token: string;
  @IsString()
  pubKey: string;
  @IsString()
  walletAddress: string;
}
