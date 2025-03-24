import { IsOptional } from 'class-validator';
import { GameSession } from 'src/game-sessions/entities/game-session.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @IsOptional()
  @OneToMany(() => GameSession, (gameSession) => gameSession.user)
  gameSessions?: number;

  @Column()
  password: string; // hashed

  @Column({ nullable: true })
  walletAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
