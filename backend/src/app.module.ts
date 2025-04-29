import { TransactionsModule } from 'src/transactions/transactions.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { StarknetModule } from './starknet/starknet.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LeaderboardsModule } from './leaderboards/leaderboards.module';
import { LifelineModule } from './lifeline/lifeline.module';
import { OfflineQuizModule } from './offline-quiz/offline-quiz.module';
import { SecurityModule } from './security/security.module';
import { RedisConfigModule } from './redis/redis.module';
import { AdminModule } from './admin/admin.module';
import { QuizModule } from './quiz/quiz.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ApiUsageMiddleware } from './middleware/api-usage.middleware';
import { JwtModule } from '@nestjs/jwt';
import { SecurityMiddleware } from './security/security.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './auth/entities/permission.entity';
import { Role } from './auth/entities/role.entity';
import { User } from './users/entities/user.entity';
import { AuthorizationGuard } from './auth/guards/authorization.guard';
import { AuthorizationMiddleware } from './auth/middlewares/authorization.middleware';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 80,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    RedisConfigModule.register(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION', '1d') },
      }),
      inject: [ConfigService],
    }),
    AuthModule,

    // Application Modules
    UsersModule,
    PuzzlesModule,
    StepsModule,
    GameSessionsModule,
    AchievementsModule,
    ProgressModule,
    StarknetModule,
    DatabaseModule,
    BlockchainModule,
    TransactionsModule,
    CategoryModule,
    StatisticsModule,
    LeaderboardsModule,
    LifelineModule,
    OfflineQuizModule,
    SecurityModule,
    AdminModule,
    QuizModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Auth middleware first to attach user to request
      // .apply(AuthMiddleware)
      // .exclude(
      //   { path: 'auth/register', method: RequestMethod.POST },
      //   { path: 'auth/login', method: RequestMethod.POST },
      //   { path: 'api-docs', method: RequestMethod.GET },
      //   { path: 'api-docs/:path', method: RequestMethod.GET },
      // )
      // .forRoutes('*')

      // Then authorization middleware
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'api-docs', method: RequestMethod.GET },
        { path: 'api-docs/:path', method: RequestMethod.GET },
      )
      .forRoutes('*')

      // Then other middlewares
      .apply(ApiUsageMiddleware)
      .forRoutes('*')
      .apply(SecurityMiddleware)
      .forRoutes('*');
  }
}
