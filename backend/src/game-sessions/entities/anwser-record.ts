import { ApiProperty } from "@nestjs/swagger";

// Define the structure for tracking answer history
export class AnswerRecord {
    @ApiProperty({ description: 'The step ID for this answer' })
    stepId: number;
  
    @ApiProperty({ description: 'The answer submitted by the user' })
    answer: string;
  
    @ApiProperty({ description: 'Whether the answer was correct' })
    isCorrect: boolean;
  
    @ApiProperty({ description: 'The time taken to answer in seconds' })
    responseTime: number;
  
    @ApiProperty({ description: 'Timestamp when the answer was submitted' })
    timestamp: Date;
  
    @ApiProperty({ description: 'Points earned for this answer' })
    pointsAwarded: number;

  }