import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { StepsModule } from './steps/steps.module';
import { GameSessionsModule } from './game-sessions/game-sessions.module';
import { AchievementsModule } from './achievements/achievements.module';
import { AuthModule } from './auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL, 
      autoLoadEntities: true, 
      synchronize: true, 
      logging: true, 
    }),
    UsersModule,
    PuzzlesModule,
    StepsModule,
    GameSessionsModule,
    AchievementsModule,
    AuthModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
