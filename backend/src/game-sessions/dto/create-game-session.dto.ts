import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

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
  lifelinesUsed: string[];
}
