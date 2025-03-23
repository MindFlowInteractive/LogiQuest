import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { ChainProgress } from './entities/chain.progress.entity';
import { ProgressTrackingService } from './progess-tracking.service';
import { GameSession } from 'src/game-sessions/entities/game-session.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([ChainProgress, GameSession,])],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressTrackingService],
  exports: [ProgressService, ProgressTrackingService],
})
export class ProgressModule {}
