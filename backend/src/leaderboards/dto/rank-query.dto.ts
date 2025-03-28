import { IsOptional, IsString } from 'class-validator';

export class RankQueryDto {
  @IsOptional()
  @IsString()
  period?: string; 
}
