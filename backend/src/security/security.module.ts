import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisConfigModule } from 'src/redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    RedisConfigModule.register(), // ✅ Call `.register()` properly
  ],
  providers: [SecurityService],
  controllers: [SecurityController],
  exports: [SecurityService],
})
export class SecurityModule {}
