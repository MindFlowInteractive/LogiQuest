import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

interface SendNFTRewardDto {
  userId: number;
  tokenId: string;
  contractAddress: string;
  metadata: any;
}

interface SendTokenRewardDto {
  userId: number;
  amount: string;
  contractAddress: string;
  metadata: any;
}

interface TrackAchievementDto {
  userId: number;
  achievementId: string;
  metadata: any;
}

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('nft-reward')
  sendNFTReward(@Body() dto: SendNFTRewardDto) {
    return this.blockchainService.sendNFTReward(
      dto.userId,
      dto.tokenId,
      dto.contractAddress,
      dto.metadata,
    );
  }

  @Post('token-reward')
  sendTokenReward(@Body() dto: SendTokenRewardDto) {
    return this.blockchainService.sendTokenReward(
      dto.userId,
      dto.amount,
      dto.contractAddress,
      dto.metadata,
    );
  }

  @Post('achievement')
  trackAchievement(@Body() dto: TrackAchievementDto) {
    return this.blockchainService.trackAchievement(
      dto.userId,
      dto.achievementId,
      dto.metadata,
    );
  }

  @Get('transaction-status/:txHash')
  getTransactionStatus(@Param('txHash') txHash: string) {
    return this.blockchainService.getTransactionStatus(txHash);
  }

  @Post('sync-transactions')
  syncTransactionStatuses() {
    return this.blockchainService.syncTransactionStatuses();
  }
}
