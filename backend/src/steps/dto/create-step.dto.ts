import { IsString, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateStepDto {
  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsArray()
  @IsString({ each: true })
  hints: string[];

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
