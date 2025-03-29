import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the user whose progress is being updated', required: false })
  userId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 3, description: 'The current step the user is on', required: false })
  currentStep?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Indicates whether the user has completed the task', required: false })
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 2, description: 'Number of attempts made', required: false })
  attemptsCount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 95, description: 'User’s score for the current session', required: false })
  score?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'In Progress', description: 'Current status of the progress', required: false })
  status?: string;
}
