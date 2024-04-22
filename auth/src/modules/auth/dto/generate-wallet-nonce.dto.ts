import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class GenerateWalletNonce {
  @ApiProperty({
    description: 'Wallet address',
    example: '0x5dAe0935752Ad3AA773a13961fCD325359cDed6b',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  readonly walletAddress: string;
}
