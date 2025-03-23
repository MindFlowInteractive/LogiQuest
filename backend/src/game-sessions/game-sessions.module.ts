import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GameSessionsService } from "./game-sessions.service"
import { GameSessionsController } from "./game-sessions.controller"
import { GameSession } from "./entities/game-session.entity"
import { User } from "../users/entities/user.entity"
import { RedisConfigModule } from "src/redis/redis.module"
import { Puzzle } from "src/puzzles/entities/puzzle.entity"
import { ScoreService } from "./score.service"
import { Step } from "src/steps/entities/step.entity"


@Module({
  imports: [TypeOrmModule.forFeature([GameSession, User, Puzzle, Step]), RedisConfigModule,
    // Conditionally import Redis
    ...(process.env.REDIS_ENABLED === 'true' ? [RedisConfigModule.register()] : []),
  ],
  controllers: [GameSessionsController],
  providers: [GameSessionsService, ScoreService],
  exports: [GameSessionsService],
})
export class GameSessionsModule {}

