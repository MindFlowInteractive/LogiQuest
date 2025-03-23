import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';

import { AnswerHistory } from './answer-history.entity';
import { LifelineUsage } from './lifeLineUsage.entity';

import { AnswerRecord } from './anwser-record';


@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the game session' })
  id: number;

  @ManyToOne(() => User)
  @ApiProperty({
    description: 'The user associated with this game session',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Puzzle)
  @ApiProperty({
    description: 'The Puzzle being played in this session',
    type: () => Puzzle,
  })
  puzzle: Puzzle;

  @Column()
  @ApiProperty({
    description: 'The current step the user is on',
    example: 2,
  })
  currentStep: number;

  @Column()
  @ApiProperty({
    description: 'The score achieved in this session',
    example: 150,
  })
  score: number;

  @Column({ type: 'enum', enum: ['active', 'completed', 'abandoned'] })
  @ApiProperty({
    description: 'The current status of the game session',
    enum: ['active', 'completed', 'abandoned'],
    example: 'active',
  })
  status: 'active' | 'completed' | 'abandoned';

  @Column()
  @ApiProperty({
    description: 'Number of attempts made in the session',
    example: 3,
  })
  attempts: number;

  @Column({ default: 0 })
  currectAnswers: number;

  @Column({ default: 0 })
  incorrectAnswers: number;

  @OneToMany(() => AnswerHistory, (answerHistory) => answerHistory.gameSession)
  answerHistory: AnswerHistory[];

  @Column({ default: 0 })
  lifeLineUsed: LifelineUsage[];

  @CreateDateColumn()
  @ApiProperty({
    description: 'The timestamp when the session started',
    example: '2024-02-18T12:34:56.789Z',
  })
  startTime: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The last activity timestamp in the session',
    example: '2024-02-18T14:20:10.123Z',
  })
  lastActive: Date;

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
}
