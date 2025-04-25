import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.method + '-' + request.url;
    return key;
  }
}
