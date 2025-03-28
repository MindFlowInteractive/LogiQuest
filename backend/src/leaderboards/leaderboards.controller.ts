import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ReqUser } from '../auth/common/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('api/leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @Get('global')
  async getGlobalLeaderboard(
    @Query('period') period: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.leaderboardsService.getLeaderboard(
      undefined,
      period || 'all-time',
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('categories/:category')
  async getCategoryLeaderboard(
    @Param('category') category: string,
    @Query('period') period: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.leaderboardsService.getLeaderboard(
      category,
      period || 'all-time',
      parseInt(page),
      parseInt(limit),
    );
  }

  @UseGuards(AuthGuard)
  @Get('users/me/rank')
  async getUserRank(
    @ReqUser() user: User,
    @Query('period') period: string,
    @Query('category') category: string,
  ) {
    return this.leaderboardsService.getUserRank(
      user,
      category,
      period || 'all-time',
    );
  }
}
