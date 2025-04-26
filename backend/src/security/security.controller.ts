import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('report')
  async reportSuspiciousActivity(
    @Body('ip') ip: string,
    @Body('activity') activity: string,
  ) {
    await this.securityService.trackSuspiciousActivity(ip, activity);
    return { status: 'reported' };
  }
}
