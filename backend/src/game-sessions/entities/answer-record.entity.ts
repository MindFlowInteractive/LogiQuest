import { ApiProperty } from "@nestjs/swagger"

export class AnswerRecord {
  @ApiProperty({
    description: "The ID of the step/question that was answered",
    example: 5,
  })
  stepId: number

  @ApiProperty({
    description: "The answer provided by the user",
    example: "Paris",
  })
  answer: string

  @ApiProperty({
    description: "Whether the answer was correct",
    example: true,
  })
  isCorrect: boolean

  @ApiProperty({
    description: "Time taken to answer in seconds",
    example: 4.2,
  })
  responseTime: number

  @ApiProperty({
    description: "Timestamp when the answer was submitted",
    example: "2024-02-18T14:15:30.123Z",
  })
  timestamp: Date

  @ApiProperty({
    description: "Points awarded for this answer",
    example: 50,
  })
  pointsAwarded: number

  @ApiProperty({
    description: "Any lifelines used for this question",
    example: ["fiftyFifty"],
    required: false,
  })
  lifelinesUsed?: string[]
}

