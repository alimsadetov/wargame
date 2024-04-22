import { ApiProperty } from '@nestjs/swagger';

export class EverWalletLoginDto {
  @ApiProperty({ example: '0:e9da2907c187efd86c6e1176bae83ea5c4d21f19284fdf551792a8a2f909644e' })
  address: string;

  @ApiProperty({ example: '75b6d0793af11e0dc42309e486335eeb0ca6133579658ac4f8c27c23d3100df2' })
  publicKey: string;

  @ApiProperty({ example: 'HsORS9BpHK9mxeGxrMUqjg477EZ380Y12nGzUc2jwbG9ih30zDcJQaZJSCToMpvgzvMLQW1/cm6EOTDQJy38AQ==' })
  signature: string;

  @ApiProperty({ example: 'd54cb3d0-0931-44bb-8eda-4fdffea87a3d' })
  nonce: string;
}

export class ChangeEverWalletDto {
  @ApiProperty({ example: '0:e9da2907c187efd86c6e1176bae83ea5c4d21f19284fdf551792a8a2f909644e' })
  newAddress: string;

  @ApiProperty({ example: '75b6d0793af11e0dc42309e486335eeb0ca6133579658ac4f8c27c23d3100df2' })
  publicKey: string;
}
