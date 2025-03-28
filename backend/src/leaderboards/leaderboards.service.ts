import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LeaderboardsService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private getStartDateForPeriod(period: string): Date | null {
    if (!period || period === 'all-time') {
      return null;
    }
    const now = new Date();
    switch (period) {
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'weekly':
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek;
        return new Date(now.getFullYear(), now.getMonth(), diff);
      default:
        return null;
    }
  }

  async getLeaderboard(
    category: string | undefined,
    period: string,
    page: number,
    limit: number,
  ) {
    const startDate = this.getStartDateForPeriod(period);
    let qb = this.scoreRepository
      .createQueryBuilder('score')
      .select('score.userId', 'userId')
      .addSelect('user.username', 'username')
      .addSelect('SUM(score.score)', 'totalScore')
      .leftJoin('score.user', 'user')
      .groupBy('score.userId')
      .addGroupBy('user.username')
      .orderBy('totalScore', 'DESC');
    if (category) {
      qb = qb.where('score.category = :category', { category });
    }
    if (startDate) {
      qb = qb.andWhere('score.createdAt >= :startDate', { startDate });
    }
    qb = qb.skip((page - 1) * limit).take(limit);
    return qb.getRawMany();
  }

  async getUserRank(user: User, category: string, period: string) {
    const startDate = this.getStartDateForPeriod(period);
    let userScoreQb = this.scoreRepository
      .createQueryBuilder('score')
      .select('SUM(score.score)', 'userTotalScore')
      .where('score.userId = :userId', { userId: user.id });
    if (category) {
      userScoreQb = userScoreQb.andWhere('score.category = :category', { category });
    }
    if (startDate) {
      userScoreQb = userScoreQb.andWhere('score.createdAt >= :startDate', { startDate });
    }
    const userScoreResult = await userScoreQb.getRawOne<{ userTotalScore: number }>();
    const userTotalScore = userScoreResult?.userTotalScore || 0;
    if (userTotalScore === 0) {
      return { userTotalScore, rank: null };
    }
    let rankQb = this.scoreRepository
      .createQueryBuilder('score')
      .select('score.userId', 'userId')
      .addSelect('SUM(score.score)', 'totalScore')
      .groupBy('score.userId')
      .orderBy('totalScore', 'DESC');
    if (category) {
      rankQb = rankQb.where('score.category = :category', { category });
    }
    if (startDate) {
      rankQb = rankQb.andWhere('score.createdAt >= :startDate', { startDate });
    }
    const allResults = await rankQb.getRawMany<{ userId: number; totalScore: number }>();
    allResults.sort((a, b) => b.totalScore - a.totalScore);
    const rank = allResults.findIndex((r) => r.userId === user.id) + 1;
    return { userTotalScore, rank };
  }

  async recordQuizScore(userId: number, category: string, points: number) {
    const score = this.scoreRepository.create({
      user: { id: userId },
      category,
      score: points,
    });
    return this.scoreRepository.save(score);
  }
}
