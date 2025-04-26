import { Inject, Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class SecurityService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async trackSuspiciousActivity(ip: string, activity: string): Promise<void> {
    const key = `suspicious:${ip}`;
    await this.redis.zadd(key, Date.now(), activity);
    await this.redis.expire(key, 86400); // 24 hours
  }

  async isIpBlocked(ip: string): Promise<boolean> {
    const key = `blocked:${ip}`;
    const isBlocked = await this.redis.exists(key);
    return isBlocked === 1;
  }
}
