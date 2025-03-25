import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { StarknetService } from 'src/starknet/starknet.service';
import { ProgressionHandler } from './handlers/progression-handler';
import { PerformanceHandler } from './handlers/performance-handler';
import { CategoryHandler } from './handlers/category-mastery-handler';
import { SpecialHandler } from './handlers/special-handler';
import { RareNFTHandler } from './handlers/rare-nft-handler';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Achievement, User])],
  controllers: [AchievementsController],
  providers:  [
    AchievementsService,
    StarknetService,
    ProgressionHandler,
    PerformanceHandler,
    CategoryHandler,
    SpecialHandler,
    RareNFTHandler,
  ],
})
export class AchievementsModule {}
