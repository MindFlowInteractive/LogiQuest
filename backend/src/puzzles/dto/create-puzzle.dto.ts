import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStepDto } from 'src/steps/dto/create-step.dto';

export class CreatePuzzleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  difficulty: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateStepDto)
  steps: CreateStepDto[];

  @IsString()
  category: string;

}
