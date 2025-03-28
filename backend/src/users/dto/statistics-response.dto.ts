import { Exclude, Expose, Type } from 'class-transformer';
import { CategoryProficiencyDto, StatisticsDto } from './user-response.dto';

@Exclude()
export class StatisticsResponseDto {
  @Expose()
  totalScore: number;

  @Expose()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto;

  @Expose()
  categoryProficiency: Record<string, CategoryProficiencyDto>;
}

@Exclude()
export class CategoryStatisticsResponseDto {
  @Expose()
  category: string;

  @Expose()
  quizzesTaken: number;

  @Expose()
  correctAnswers: number;

  @Expose()
  averageScore: number;

  @Expose()
  lastAttempt: Date | null;

}

@Exclude()
export class PerformanceHistoryResponseDto {
  @Expose()
  period: 'day' | 'week' | 'month';

  @Expose()
  data: Array<{
    date?: Date;
    week?: number;
    year?: number;
    month?: number;
    score: number;
  }>;
}
