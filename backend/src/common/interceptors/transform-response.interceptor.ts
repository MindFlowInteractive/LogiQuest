import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        // this checks if response has pagination metadata
        const hasPagination = data && data.meta && data.items;

        return {
          status: 'success',
          data: hasPagination ? data.items : data,
          metadata: hasPagination ? { pagination: data.meta } : {},
        };
      }),
    );
  }
}
