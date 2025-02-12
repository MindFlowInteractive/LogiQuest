import { IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProgressDto {
  @IsNumber()
  @Min(0)
  currentStep: number;

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  @Min(0)
  score: number;
}

export class ProgressResponseDto {
  @IsNumber()
  chainId: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsNumber()
  @Min(0)
  score: number;

  @IsBoolean()
  completed: boolean;

  @Type(() => Date)
  lastAttempt: Date;

  constructor(partial: Partial<ProgressResponseDto>) {
    Object.assign(this, partial);
  }
}
