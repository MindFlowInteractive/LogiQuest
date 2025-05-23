import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('PORT', 3000));
  }

  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get databasePort(): number {
    return Number(this.configService.get<number>('DATABASE_PORT'));
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
