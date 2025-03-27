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
  password: string; // hashed

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

  @Column('json', { nullable: true })
  achievements: {
    id: number;
    name: string;
    description: string;
    nftTokenId?: string;
    dateEarned: Date;
  }[];

  @Column('json', { nullable: true })
  statistics: {
    puzzlesSolved: number;
    totalPoints: number;
    rank: string;
    completionRate: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GameSession, (gameSession) => gameSession.user)
  gameSessions?: GameSession[];
}
