import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Login of the user.',
  })
  @IsString({ message: 'login должен быть строкой.' })
  readonly login: string;

  @IsNotEmpty({ message: 'Пароль должен быть заполнен.' })
  @ApiProperty({ example: '123456', description: 'Password for account.' })
  @IsString({ message: 'Пароль должен быть строкой.' })
  readonly password: string;
}
