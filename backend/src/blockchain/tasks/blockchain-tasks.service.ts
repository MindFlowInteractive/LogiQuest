import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlockchainService } from '../blockchain.service';

@Injectable()
export class BlockchainTasksService {
  private readonly logger = new Logger(BlockchainTasksService.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleSyncTransactions() {
    this.logger.debug('Running transaction sync job');
    try {
      await this.blockchainService.syncTransactionStatuses();
      this.logger.debug('Transaction sync completed successfully');
    } catch (error) {
      this.logger.error(
        `Transaction sync failed: ${error.message}`,
        error.stack,
      );
    }
  }
}
