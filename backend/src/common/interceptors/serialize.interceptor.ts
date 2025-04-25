import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: Type<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.classType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
