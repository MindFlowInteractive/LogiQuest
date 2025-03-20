import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateGameSessionDto } from './create-game-session.dto';

export class UpdateGameSessionDto extends PartialType(CreateGameSessionDto) {
  @IsNumber()
  @IsOptional()
  currentStep?: number;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsEnum(['active', 'completed', 'abandoned'])
  @IsOptional()
  status?: 'active' | 'completed' | 'abandoned';

  @IsNumber()
  @IsOptional()
  attempts?: number;
}
