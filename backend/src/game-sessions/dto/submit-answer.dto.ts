import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray } from "class-validator"

export class SubmitAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the step/question being answered",
    example: 3,
  })
  stepId: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The answer provided by the user",
    example: "Jupiter",
  })
  answer: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Time taken to answer in seconds",
    example: 2.5,
  })
  responseTime: number

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: "Any lifelines used for this question",
    example: ["fiftyFifty"],
    required: false,
  })
  lifelinesUsed?: string[]
}

