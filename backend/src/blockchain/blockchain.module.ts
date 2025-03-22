import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { BlockchainTasksService } from './tasks/blockchain-tasks.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TransactionsModule, ConfigModule],
  controllers: [BlockchainController],
  providers: [BlockchainService, BlockchainTasksService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
