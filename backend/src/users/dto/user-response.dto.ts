import { Exclude, Expose, Type } from 'class-transformer';

export class StatisticsDto {
  @Expose()
  quizzesTaken: number;

  @Expose()
  correctAnswers: number;

  @Expose()
  incorrectAnswers: number;

  @Expose()
  averageScore: number;

  @Expose()
  highestScore: number;

  @Expose()
  fastestCompletionTime: number;
}

export class CategoryProficiencyDto {
  @Expose()
  quizzesTaken: number;

  @Expose()
  correctAnswers: number;

  @Expose()
  averageScore: number;

  @Expose()
  lastAttempt: Date | null;
}

export class PerformanceHistoryDto {
  @Expose()
  daily: Array<{ date: Date; score: number }>;

  @Expose()
  weekly: Array<{ week: number; year: number; score: number }>;

  @Expose()
  monthly: Array<{ month: number; year: number; score: number }>;
}

export class ProfileCustomizationDto {
  @Expose()
  theme: 'light' | 'dark' | 'system';

  @Expose()
  avatarUrl: string;

  @Expose()
  bio: string;
}

// @Exclude()
@Expose()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude()
  password: string

  @Expose()
  walletAddress: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  totalScore: number;

  @Expose()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto;

  @Expose()
  categoryProficiency: Record<string, CategoryProficiencyDto>;

  @Expose()
  @Type(() => PerformanceHistoryDto)
  performanceHistory: PerformanceHistoryDto;

  @Expose()
  @Type(() => ProfileCustomizationDto)
  profileCustomization: ProfileCustomizationDto;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
