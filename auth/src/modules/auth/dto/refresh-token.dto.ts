import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class RefreshTokenDto {
  @ApiProperty({
    example: 'skadmoaow.2d2m83du&sda.mndbwJDlsad@1d',
    description: 'Disposable refresh token for refreshing access token',
  })
  @IsNotEmpty()
  readonly refreshToken: string;
}

export default RefreshTokenDto;
