import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('users/me/achievements')
  @ApiOperation({ summary: 'Fetch user achievements' })
  @ApiResponse({
    status: 200,
    description: 'List of user achievements.',
    isArray: true,
  })
  async getUserAchievements() {
    const userId = 1; // Mock user ID; replace with actual user context
    return this.achievementsService.getUserAchievements(userId);
  }

  @Get('users/me/achievements/progress')
  @ApiOperation({ summary: 'Get progress toward all achievements for a user' })
  @ApiResponse({
    status: 200,
    description: 'Progress details for achievements.',
    isArray: true,
  })
  async getAchievementProgress() {
    const userId = 1; // Mock user ID; replace with actual user context
    return this.achievementsService.getAchievementProgress(userId);
  }

  @Get('users/me/nfts')
  @ApiOperation({ summary: 'View NFT rewards' })
  @ApiResponse({
    status: 200,
    description: 'List of NFTs received as achievement rewards.',
    isArray: true,
  })
  async getUserNFTs() {
    const userId = 1; // Mock user ID; replace with actual user context
    return this.achievementsService.getUserNFTs(userId);
  }

  @Post('claim')
  @ApiOperation({ summary: 'Claim an achievement' })
  @ApiBody({ schema: { example: { achievementId: 1 } } })
  @ApiResponse({
    status: 200,
    description: 'Achievement successfully claimed.',
  })
  async claimAchievement(@Body('achievementId') achievementId: number) {
    const userId = 1; // Mock user ID; replace with actual user context
    return this.achievementsService.claimAchievement(userId, achievementId);
  }
}
