import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../constants/users.constants';

export class RegistrationDto {
  @ApiProperty({
    example: 'admin',
    description: 'Login of the user.',
  })
  @IsDefined()
  readonly login: string;

  @IsNotEmpty({ message: 'Пароль не должен быть пустым.' })
  @ApiProperty({ example: '123', description: 'Password for account.' })
  @IsString({ message: 'Пароль должен быть строкой.' })
  @Length(MIN_PASSWORD_LENGTH, undefined, {
    message: `Пароль должен быть минимум ${MIN_PASSWORD_LENGTH} символов.`,
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Пожалуйста, подтвердите пароль.' })
  @ApiProperty({ example: '123', description: 'Must be the same as password.' })
  readonly passwordConfirm: string;
}
