import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStepDto } from '../../steps/dto/create-step.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PuzzleDifficulty } from '../entities/puzzle.entity';

export class CreatePuzzleDto {
  @ApiProperty({
    type: 'string',
    description: 'The puzzle title',
    example: 'Math Problem',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'The puzzle description',
    example: 'Solve this math problem: 2 + 2 =?',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: PuzzleDifficulty,
    description: 'The difficulty level of the puzzle',
    example: PuzzleDifficulty.EASY,
  })
  @IsEnum(PuzzleDifficulty)
  difficulty: PuzzleDifficulty;

  @ApiProperty({
    type: 'string',
    description: 'The category of the puzzle',
    example: 'math',
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: 'number',
    description: 'The points awarded for completing the puzzle',
    example: 100,
  })
  @IsNumber()
  @Min(0)
  points: number;

  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    type: 'array',
    description: 'The puzzle steps',
    example: [
      {
        description: 'Solve this math: 2 + 2',
        order: 1,
        hints: ['Add 2 to 2'],
        options: ['4', '5', '4'],
        correctAnswer: '4',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateStepDto)
  steps: CreateStepDto[];
}
