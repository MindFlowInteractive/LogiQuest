import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { StepsModule } from './steps/steps.module';
import { GameSessionsModule } from './game-sessions/game-sessions.module';
import { AchievementsModule } from './achievements/achievements.module';
import { AuthModule } from './auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { DatabaseModule } from './database/database.module';
import { validateConfig } from './config/config.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoryModule } from './category/category.module';
import { StarknetModule } from './starknet/starknet.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LeaderboardsModule } from './leaderboards/leaderboards.module';
import { LifelineModule } from './lifeline/lifeline.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Set the correct path for your environment file if needed
      envFilePath: '.env.development',
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      // validate: validateConfig, // Load environment variables
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UsersModule,
    PuzzlesModule,
    StepsModule,
    GameSessionsModule,
    AchievementsModule,
    AuthModule,
    ProgressModule,
    StarknetModule,
    DatabaseModule,
    BlockchainModule,
    TransactionsModule,
    CategoryModule,
    StatisticsModule,
    LeaderboardsModule,
    LifelineModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
