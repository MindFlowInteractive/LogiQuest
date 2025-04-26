import { GameSession } from 'src/game-sessions/entities/game-session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Score } from '../../leaderboards/entities/score.entity';
import { UserQuiz } from 'src/quiz/entities/user-quiz.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'johndoe', description: 'Unique username of the user' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Unique email of the user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword123', description: 'User password (hashed)' })
  @Column()
  password: string;

  @ApiProperty({ example: '0x1234abcd...', description: 'User wallet address', nullable: true })
  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ 
    type: 'enum',
    enum: ['public', 'private', 'friends'],
    default: 'public'
  })
  profileVisibility: string;

  @Column({ nullable: true })
  walletAddress: string;


  @ApiProperty({ example: '2025-03-27T12:00:00.000Z', description: 'Timestamp when the user was created' })
  @Column({ default: 0 })
  totalScore: number;

  @Column({ type: 'jsonb', nullable: true })
  statistics: {
    quizzesTaken: number;
    correctAnswers: number;
    incorrectAnswers: number;
    averageScore: number;
    highestScore: number;
    fastestCompletionTime: number;
  };

  @Column({ type: 'jsonb', nullable: true })
  categoryProficiency: Record<
    string,
    {
      quizzesTaken: number;
      correctAnswers: number;
      averageScore: number;
      lastAttempt: Date;
    }
  >;

  @Column({ type: 'jsonb', nullable: true })
  performanceHistory: {
    daily?: Array<{ date: Date; score: number }>;
    weekly?: Array<{ week: number; year: number; score: number }>;
    monthly?: Array<{ month: number; year: number; score: number }>;
  };

  @Column({ type: 'jsonb', nullable: true })
  profileCustomization: {
    theme: 'light' | 'dark' | 'system';
    avatarUrl: string;
    bio: string;
  };

  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({ example: '2025-03-27T12:30:00.000Z', description: 'Timestamp when the user was last updated' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @ApiProperty({
    type: () => [GameSession],
    description: 'List of game sessions associated with the user',
    required: false,
  })
  @OneToMany(() => GameSession, (gameSession) => gameSession.user)
  gameSessions?: GameSession[];

  @OneToMany(
    () => UserQuiz,
    (userQuiz) => userQuiz.user,
  )
  userQuizzes: UserQuiz[]

  @Column({ default: "user" })
  role: string

  @Column({ default: true })
  isActive: boolean
}
