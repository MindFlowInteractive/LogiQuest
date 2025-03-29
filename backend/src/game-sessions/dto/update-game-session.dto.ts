import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateGameSessionDto } from './create-game-session.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameSessionDto extends PartialType(CreateGameSessionDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 3, description: 'Current step the user is on in the game session' })
  currentStep?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1500, description: 'Current score of the user in the game session' })
  score?: number;

  @IsEnum(['active', 'completed', 'abandoned'])
  @IsOptional()
  @ApiProperty({
    example: 'active',
    description: 'Current status of the game session',
    enum: ['active', 'completed', 'abandoned'],
  })
  status?: 'active' | 'completed' | 'abandoned';

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 2, description: 'Number of attempts made in the game session' })
  attempts?: number;
}
