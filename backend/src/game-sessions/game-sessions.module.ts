import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSessionsService } from './game-sessions.service';
import { GameSessionsController } from './game-sessions.controller';
import { GameSession } from './entities/game-session.entity';
import { User } from '../users/entities/user.entity';
import { RedisConfigModule } from 'src/redis/redis.module';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';
import { AnswerHistory } from './entities/answer-history.entity';
import { LifelineUsage } from './entities/lifeLineUsage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameSession, User, Puzzle, AnswerHistory, LifelineUsage]),
    RedisConfigModule,
    // Conditionally import Redis
    ...(process.env.REDIS_ENABLED === 'true'
      ? [RedisConfigModule.register()]
      : []),
  ],
  controllers: [GameSessionsController],
  providers: [GameSessionsService],
  exports: [GameSessionsService],
})
export class GameSessionsModule {}
