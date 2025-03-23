import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { LifelineUsage } from '../entities/lifeLineUsage.entity';

export class CreateGameSessionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  chainId: number;

  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  incorrectAnswers: number;

  answerHistory: { questionId: number; answer: string; correct: boolean }[];

  @IsString()
  lifelinesUsed: LifelineUsage[];
}
