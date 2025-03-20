import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { GameSession } from './game-session.entity';

@Entity()
export class LifelineUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Example: "50-50", "Ask the Audience"

  @CreateDateColumn()
  usedAt: Date; // Timestamp when lifeline was used

  @ManyToOne(() => GameSession, (session) => session.lifeLineUsed, {
    onDelete: 'CASCADE',
  })
  session: GameSession;
}
