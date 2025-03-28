import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Puzzle } from "src/puzzles/entities/puzzle.entity"
import { AnswerRecord } from "./answer-record.entity"

@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "The unique identifier of the game session" })
  id: number

  @ManyToOne(() => User)
  @ApiProperty({
    description: "The user associated with this game session",
    type: () => User,
  })
  user: User

  @ManyToOne(() => Puzzle)
  @ApiProperty({
    description: "The Puzzle being played in this session",
    type: () => Puzzle,
  })
  puzzle: Puzzle

  @Column({ default: 0 })
  @ApiProperty({
    description: "The current step/question the user is on",
    example: 2,
  })
  currentStep: number

  @Column({ default: 0 })
  @ApiProperty({
    description: "The total score achieved in this session",
    example: 150,
  })
  score: number

  @Column({ type: "enum", enum: ["active", "completed", "abandoned"] })
  @ApiProperty({
    description: "The current status of the game session",
    enum: ["active", "completed", "abandoned"],
    example: "active",
  })
  status: "active" | "completed" | "abandoned"

  @Column({ default: 0 })
  @ApiProperty({
    description: "Number of attempts made in the session",
    example: 3,
  })
  attempts: number

  @CreateDateColumn()
  @ApiProperty({
    description: "The timestamp when the session started",
    example: "2024-02-18T12:34:56.789Z",
  })
  startTime: Date

  @UpdateDateColumn()
  @ApiProperty({
    description: "The last activity timestamp in the session",
    example: "2024-02-18T14:20:10.123Z",
  })
  lastActive: Date


  // Quiz-specific fields
  @Column({ default: 0 })
  @ApiProperty({
    description: "The current score in the quiz session",
    example: 75,
  })
  currentScore: number

  @Column("jsonb", { default: [] })
  @ApiProperty({
    description: "History of answers submitted during the quiz",
    type: [AnswerRecord],
  })
  answerHistory: AnswerRecord[]

  @Column({ default: 0 })
  @ApiProperty({
    description: "Current streak of correct answers",
    example: 3,
  })
  streakCount: number

  @Column({ default: false })
  @ApiProperty({
    description: "Whether the quiz session is completed",
    example: false,
  })
  isCompleted: boolean

  @Column({ nullable: true })
  @ApiProperty({
    description: "The category ID for the quiz",
    example: "science",
  })
  categoryId: string

  // Lifeline tracking fields
  @Column({ default: false })
  @ApiProperty({
    description: "Whether the 50/50 lifeline has been used",
    example: false,
  })
  isFiftyFiftyUsed: boolean

  @Column({ default: false })
  @ApiProperty({
    description: "Whether the Ask a Friend lifeline has been used",
    example: false,
  })
  isAskFriendUsed: boolean

  @Column({ default: false })
  @ApiProperty({
    description: "Whether the Audience Poll lifeline has been used",
    example: false,
  })
  isAudiencePollUsed: boolean

  @Column({ default: 0 })
  @ApiProperty({
    description: "Number of correct answers in the session",
    example: 7,
  })
  correctAnswers: number

  @Column({ default: 0 })
  @ApiProperty({
    description: "Number of incorrect answers in the session",
    example: 2,
  })
  incorrectAnswers: number

  @Column({ nullable: true, type: "timestamp" })
  @ApiProperty({
    description: "The timestamp when the session was completed",
    example: "2024-02-18T15:30:45.123Z",
  })
  completedAt: Date

  @Column({ default: 0 })
  @ApiProperty({
    description: "Average response time in seconds",
    example: 3.5,
  })
  averageResponseTime: number
=======
  // New fields
  @Column()
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  currentScore: number;

  @Column('jsonb', { default: [] })
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  answerHistory: AnswerRecord[];

  @Column()
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  streakCount: number;

  @Column({ default: false })
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  isCompleted: boolean;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  categoryId: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Whether the 50/50 lifeline has been used',
    example: false,
  })
  isFiftyFiftyUsed: boolean;

  @Column({ default: false })
  @ApiProperty({
    description: 'Whether the Ask a Friend lifeline has been used',
    example: false,
  })
  isAskFriendUsed: boolean;

}

