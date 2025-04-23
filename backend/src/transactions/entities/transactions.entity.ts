import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export enum TransactionType {
  REWARD = 'reward',
  ACHIEVEMENT = 'achievement',
  NFT = 'nft',
  TOKEN = 'token',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('transactions')
export class Transaction {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'reward', enum: TransactionType })
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ example: 'pending', enum: TransactionStatus })
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ApiProperty({ example: '0xabc123...', nullable: true })
  @Column({ nullable: true })
  txHash: string;

  @ApiProperty({ example: 123456, nullable: true })
  @Column({ nullable: true })
  blockNumber: number;

  @ApiProperty({ example: '100', nullable: true })
  @Column({ nullable: true })
  amount: string;

  @ApiProperty({ example: '12345', nullable: true })
  @Column({ nullable: true })
  tokenId: string;

  @ApiProperty({ example: '0xcontractaddress...', nullable: true })
  @Column({ nullable: true })
  contractAddress: string;

  @ApiProperty({ example: { key: 'value' }, nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
