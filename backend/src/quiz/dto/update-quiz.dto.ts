import { IsOptional, IsArray, ValidateNested, IsBoolean } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { CreateQuestionDto } from "./create-question.dto"

export class UpdateQuizDto {
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  category?: string

  @ApiProperty({ required: false })
  @IsOptional()
  difficulty?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ type: [CreateQuestionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[]
}

