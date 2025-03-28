import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { User as CurrentUser } from '../auth/common/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ProfileResponseDto } from '../users/dto/profile-response.dto';
import { StatisticsResponseDto } from '../users/dto/statistics-response.dto';
import {
  CategoryStatisticsResponseDto,
  PerformanceHistoryResponseDto,
} from '../users/dto/statistics-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Statistics')
@Controller('api/users/me')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile with basic statistics' })
  @ApiResponse({
    status: 200,
    description: 'Profile data retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getProfile(@CurrentUser() user: User): Promise<ProfileResponseDto> {
    try {
      const profile = await this.statisticsService.getUserProfile(user.id);
      return profile;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get detailed performance statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
  })
  async getStatistics(
    @CurrentUser() user: User,
  ): Promise<StatisticsResponseDto> {
    try {
      const stats = await this.statisticsService.getUserStatistics(user.id);
      return stats;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('statistics/categories/:category')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get category-specific performance statistics' })
  @ApiResponse({
    status: 200,
    description: 'Category statistics retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No statistics available for this category',
  })
  async getCategoryStatistics(
    @CurrentUser() user: User,
    @Param('category') category: string,
  ): Promise<CategoryStatisticsResponseDto> {
    try {
      const stats = await this.statisticsService.getCategoryStatistics(
        user.id,
        category,
      );
      return stats;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('statistics/history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get historical performance data' })
  @ApiResponse({
    status: 200,
    description: 'Historical data retrieved successfully',
  })
  async getPerformanceHistory(
    @CurrentUser() user: User,
    @Query('period') period: 'day' | 'week' | 'month' = 'week',
  ): Promise<PerformanceHistoryResponseDto> {
    try {
      const history = await this.statisticsService.getPerformanceHistory(
        user.id,
        period,
      );
      return history;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
