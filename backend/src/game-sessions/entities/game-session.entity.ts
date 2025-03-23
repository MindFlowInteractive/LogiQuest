// game-session.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';
import { AnswerHistory } from './answer-history.entity';
import { LifelineUsage } from './lifeLineUsage.entity';

@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.gameSessions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Puzzle, { eager: true })
  puzzle: Puzzle;

  @Column({ default: 0 })
  currentStep: number;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: 1 })
  attempts: number;

  @Column({ default: 0 })
  correctAnswers: number;

  @Column({ default: 0 })
  incorrectAnswers: number;

  @OneToMany(() => AnswerHistory, (answer) => answer.gameSession, {
    cascade: true,
  })
  answerHistory: AnswerHistory[];

  @OneToMany(() => LifelineUsage, (lifeline) => lifeline.session, {
    cascade: true,
  })
  lifeLineUsed: LifelineUsage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastActive: Date;
}
