import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetamaskWalletNonce } from '../entities/metamask-wallet-nonce.entity';

@Injectable()
export class MetamaskWalletNonceService {
  constructor(@InjectRepository(MetamaskWalletNonce) private readonly metamaskWalletNonceRepository: Repository<MetamaskWalletNonce>) {}

  async generateNonce(address: string): Promise<number> {
    const nonceTimestamp = Date.now();
    return this.upsertMetamaskWalletNonceNonce(address, nonceTimestamp);
  }

  async deleteNonce(address: string): Promise<number> {
    const existing = await this.metamaskWalletNonceRepository.findOne({ where: { address } });
    await existing.remove();
    return existing.nonce;
  }

  private async upsertMetamaskWalletNonceNonce(address: string, nonce: number): Promise<number> {
    const newRecord = this.metamaskWalletNonceRepository.create({ address, nonce });
    const queryResult = await this.metamaskWalletNonceRepository.save(newRecord);
    return queryResult.nonce;
  }
}
