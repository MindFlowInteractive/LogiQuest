// answer-history.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { GameSession } from './game-session.entity';

@Entity()
export class AnswerHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameSession, (session) => session.answerHistory, {
    onDelete: 'CASCADE',
  })
  gameSession: GameSession;

  @Column()
  questionId: number;

  @Column()
  answerText: string;

  @Column()
  isCurrect: boolean;

  @CreateDateColumn()
  submittedAt: Date;
}
