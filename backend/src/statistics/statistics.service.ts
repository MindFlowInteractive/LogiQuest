// statistics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ProfileResponseDto } from '../users/dto/profile-response.dto';
import { plainToClass } from 'class-transformer';
import {
  CategoryStatisticsResponseDto,
  PerformanceHistoryResponseDto,
  StatisticsResponseDto,
} from '../users/dto/statistics-response.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUserStatistics(
    userId: number,
    quizResult: {
      score: number;
      correctAnswers: number;
      incorrectAnswers: number;
      completionTime: number;
      category: string;
    },
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Update basic statistics
    user.totalScore = (user.totalScore || 0) + quizResult.score;

    const stats = user.statistics || {
      quizzesTaken: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageScore: 0,
      highestScore: 0,
      fastestCompletionTime: 0,
    };

    stats.quizzesTaken += 1;
    stats.correctAnswers += quizResult.correctAnswers;
    stats.incorrectAnswers += quizResult.incorrectAnswers;
    stats.averageScore =
      (stats.averageScore * (stats.quizzesTaken - 1) + quizResult.score) /
      stats.quizzesTaken;
    stats.highestScore = Math.max(stats.highestScore, quizResult.score);
    stats.fastestCompletionTime = Math.min(
      stats.fastestCompletionTime,
      quizResult.completionTime,
    );

    user.statistics = stats;

    // Update category proficiency
    const category = quizResult.category.toLowerCase();
    user.categoryProficiency = user.categoryProficiency || {};

    const catStats = user.categoryProficiency[category] || {
      quizzesTaken: 0,
      correctAnswers: 0,
      averageScore: 0,
      lastAttempt: new Date(),
    };

    catStats.quizzesTaken += 1;
    catStats.correctAnswers += quizResult.correctAnswers;
    catStats.averageScore =
      (catStats.averageScore * (catStats.quizzesTaken - 1) + quizResult.score) /
      catStats.quizzesTaken;
    catStats.lastAttempt = new Date();

    user.categoryProficiency[category] = catStats;

    // Update performance history
    const now = new Date();
    user.performanceHistory = user.performanceHistory || {
      daily: [],
      weekly: [],
      monthly: [],
    };

    // Daily performance
    const today = new Date(now.setHours(0, 0, 0, 0));
    const dailyEntry = user.performanceHistory.daily.find(
      (entry) => new Date(entry.date).getTime() === today.getTime(),
    );

    if (dailyEntry) {
      dailyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.daily.push({
        date: today,
        score: quizResult.score,
      });
    }

    // Weekly performance
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekNumber = this.getWeekNumber(today);
    const year = today.getFullYear();

    const weeklyEntry = user.performanceHistory.weekly.find(
      (entry) => entry.week === weekNumber && entry.year === year,
    );

    if (weeklyEntry) {
      weeklyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.weekly.push({
        week: weekNumber,
        year,
        score: quizResult.score,
      });
    }

    // Monthly performance
    const month = today.getMonth() + 1; // 1-12
    const monthlyEntry = user.performanceHistory.monthly.find(
      (entry) => entry.month === month && entry.year === year,
    );

    if (monthlyEntry) {
      monthlyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.monthly.push({
        month,
        year,
        score: quizResult.score,
      });
    }

    // Keep only last 30 days, 12 weeks, and 12 months for performance
    user.performanceHistory.daily = user.performanceHistory.daily
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);

    user.performanceHistory.weekly = user.performanceHistory.weekly
      .sort((a, b) => b.year - a.year || b.week - a.week)
      .slice(0, 12);

    user.performanceHistory.monthly = user.performanceHistory.monthly
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, 12);

    await this.userRepository.save(user);
  }

  async getUserProfile(userId: number): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    return plainToClass(
      ProfileResponseDto,
      {
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
        createdAt: user.createdAt,
        totalScore: user.totalScore,
        statistics: user.statistics,
        profileCustomization: user.profileCustomization,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async getUserStatistics(userId: number): Promise<StatisticsResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    return plainToClass(
      StatisticsResponseDto,
      {
        totalScore: user.totalScore || 0,
        statistics: user.statistics || {
          quizzesTaken: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          averageScore: 0,
          highestScore: 0,
          fastestCompletionTime: 0,
        },
        categoryProficiency: user.categoryProficiency || {},
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async getCategoryStatistics(
    userId: number,
    category: string,
  ): Promise<CategoryStatisticsResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const normalizedCategory = category.toLowerCase();
    const proficiency = user.categoryProficiency?.[normalizedCategory] || {
      quizzesTaken: 0,
      correctAnswers: 0,
      averageScore: 0,
      lastAttempt: null,
    };

    return plainToClass(
      CategoryStatisticsResponseDto,
      {
        category: normalizedCategory,
        ...proficiency,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async getPerformanceHistory(
    userId: number,
    period: 'day' | 'week' | 'month' = 'week',
  ): Promise<PerformanceHistoryResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const performanceHistory = user.performanceHistory || {
      daily: [],
      weekly: [],
      monthly: [],
    };

    switch (period) {
      case 'day':
        performanceHistory.daily.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case 'week':
        performanceHistory.weekly.sort(
          (a, b) => b.year - a.year || b.week - a.week,
        );
        break;
      case 'month':
        performanceHistory.monthly.sort(
          (a, b) => b.year - a.year || b.month - a.month,
        );
        break;
      default:
        break;
    }
    return plainToClass(
      PerformanceHistoryResponseDto,
      {
        period,
        data: performanceHistory,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((d.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  }
}
