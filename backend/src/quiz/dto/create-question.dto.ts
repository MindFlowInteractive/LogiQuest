import { IsNotEmpty, IsArray, ValidateNested, IsOptional } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { OptionDto } from "./option.dto"

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string

  @ApiProperty({ type: [OptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[]

  @ApiProperty({ required: false })
  @IsOptional()
  explanation?: string
}

