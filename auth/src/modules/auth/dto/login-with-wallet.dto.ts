import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginMetamaskDto {
  @ApiProperty({
    description: 'Wallet address',
    example: '0x72e06F1c8B0b13d8f9762DAfD1DFaB3a28AE9547',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;

  @ApiProperty({
    description: 'Signature for message',
    example:
      '0xec64cd48de55c0e6f30126144474ac52e824ac806b51ecd0e378b1ee4af7bab67014ef8834240c91e8fdd31c029c056b2614e72b88b0c22523f087e274ff0d2d1c',
  })
  @IsNotEmpty()
  @IsString()
  @Length(132, 132)
  readonly signature: string;
}
