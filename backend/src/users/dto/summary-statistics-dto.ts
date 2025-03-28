import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class SummaryStatisticsDto {
  @IsOptional()
  @IsNumber()
  quizzesTaken?: number;

  @IsOptional()
  @IsNumber()
  averageScore?: number;

  @IsOptional()
  @IsString()
  bestCategory?: string;

  @IsOptional()
  @IsString()
  worstCategory?: string;
}
