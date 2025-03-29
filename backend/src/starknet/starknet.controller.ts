import { Controller, Get, Param } from '@nestjs/common';
import { StarknetService } from './starknet.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Starknet') // Groups this controller under "Starknet" in Swagger
@Controller('starknet')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Get('transaction/:hash')
  @ApiOperation({ summary: 'Get transaction status by hash' })
  @ApiResponse({ status: 200, description: 'Transaction status retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid transaction hash' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async getTransactionStatus(@Param('hash') hash: string) {
    return await this.starknetService.getTransactionStatus(hash);
  }
}
