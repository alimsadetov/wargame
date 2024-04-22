import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MailingFullDto {
  @ApiProperty({
    example: 'test@mail.ru',
  })
  @IsOptional()
  @IsString({ message: 'Mail должен быть строкой.' })
  readonly mail: string;

  @ApiProperty({
    example: 'John',
  })
  @IsOptional()
  @IsString({ message: 'userName должен быть строкой.' })
  readonly userName: string;

  @ApiProperty({
    example: 'en',
  })
  @IsString({ message: 'lang должен быть строкой.' })
  readonly lang?: string;
}
