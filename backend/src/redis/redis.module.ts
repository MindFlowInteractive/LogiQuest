import { Module, DynamicModule, Global } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global() // 👈 Ensures Redis is available globally
@Module({})
export class RedisConfigModule {
  static register(): DynamicModule {
    return {
      module: RedisConfigModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'REDIS_CLIENT',
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const redis = new Redis(configService.get<string>('REDIS_URL', 'redis://localhost:6379'));
            await redis.ping(); // Test connection
            console.log('✅ Redis Connected');
            return redis;
          },
        },
      ],
      exports: ['REDIS_CLIENT'], // 👈 Export REDIS_CLIENT to be used in other modules
    };
  }
}
