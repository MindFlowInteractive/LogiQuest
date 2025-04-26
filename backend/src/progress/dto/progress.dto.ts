/* eslint-disable prettier/prettier */
import { IsNumber, IsBoolean, Min, Max, IsString, IsArray, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The current step the user is on', example: 5 })
  currentStep: number;

  @IsBoolean()
  @ApiProperty({ description: 'Indicates whether the progress is completed', example: false })
  completed: boolean;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The score achieved so far', example: 80 })
  score: number;
}

export class ProgressResponseDto {
  @IsNumber()
  @ApiProperty({ description: 'The chain ID associated with this progress', example: 1 })
  chainId: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ description: 'The percentage of progress completed', example: 75 })
  progress: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The total score accumulated', example: 150 })
  score: number;

  @IsBoolean()
  @ApiProperty({ description: 'Indicates whether the progress is completed', example: true })
  completed: boolean;

  @Type(() => Date)
  @ApiProperty({ description: 'The last attempt date', example: '2024-02-18T12:34:56.789Z' })
  lastAttempt: Date;

  constructor(partial: Partial<ProgressResponseDto>) {
    Object.assign(this, partial);
  }
}

export class CreateProgressDto {
  @ApiProperty({ description: 'User ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Chain ID' })
  @IsNumber()
  chainId: number;

  @ApiProperty({ description: 'Progress status', example: 'not_started, in_progress, completed' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Array of completed step IDs', type: [Number] })
  @IsArray()
  @IsOptional()
  completedSteps?: number[];

  @ApiProperty({ description: 'Current step index' })
  @IsNumber()
  @IsOptional()
  currentStep?: number;

  @ApiProperty({ description: 'Progress start time' })
  @IsDateString()
  @IsOptional()
  startedAt?: string;

  @ApiProperty({ description: 'Progress completion time' })
  @IsDateString()
  @IsOptional()
  completedAt?: string;
}
