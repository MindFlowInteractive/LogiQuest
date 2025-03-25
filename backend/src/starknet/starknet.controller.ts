import { Controller, Get, Param } from '@nestjs/common';
import { StarknetService } from './starknet.service';

@Controller('starknet')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Get('transaction/:hash')
  async getTransactionStatus(@Param('hash') hash: string) {
    return await this.starknetService.getTransactionStatus(hash);
  }
}
