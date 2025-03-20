import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GameSession } from './game-session.entity';

@Entity()
export class AnswerHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameSession: GameSession;

  questionId: number;

  @Column()
  answerText: string;

  @Column()
  isCurrect: boolean;

  @Column()
  submittedAt: Date;
}
