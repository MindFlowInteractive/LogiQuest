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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  walletAddress: string;

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

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @OneToMany(() => GameSession, (gameSession) => gameSession.user)
  gameSessions?: GameSession[];
}
