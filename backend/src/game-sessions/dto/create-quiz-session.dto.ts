import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { CreateGameSessionDto } from "./create-game-session.dto"

export class CreateQuizSessionDto extends CreateGameSessionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The category ID for the quiz",
    example: "science",
    required: false,
  })
  categoryId?: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "The difficulty level for the quiz (1-5)",
    example: 3,
    required: false,
  })
  difficultyLevel?: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "The number of questions in the quiz",
    example: 10,
    required: false,
  })
  questionCount?: number
}

