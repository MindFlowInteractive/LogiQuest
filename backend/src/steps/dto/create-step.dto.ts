import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateStepDto {
  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsArray()
  @IsString({ each: true })
  hints: string[];
}
