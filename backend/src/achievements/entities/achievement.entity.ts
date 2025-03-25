import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AchievementType } from 'src/common/enums/achievements-type.enum';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier for the achievement.',
    example: 1,
  })
  id: number;

  @ManyToOne(() => User)
  @ApiProperty({
    description: 'User associated with this achievement.',
    type: () => User,
  })
  user: User;

  @Column({ type: 'enum', enum: AchievementType })
  @ApiProperty({
    description: 'Type of achievement (e.g., Badge, Trophy).',
    example: 'Badge',
  })
  type: AchievementType;

  @Column()
  @ApiProperty({
    description: 'Title of the achievement.',
    example: 'First Login',
  })
  title: string;

  @Column('text')
  @ApiProperty({
    description: 'Description of the achievement.',
    example: 'Awarded for completing the first login.',
  })
  description: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description: 'Criteria that need to be met to unlock the achievement.',
    example: {
      gamesPlayed: 10,
      score: 5000,
    },
  })
  criteria: Record<string, any>;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'NFT token ID associated with the achievement, if applicable.',
    example: '123456789',
    required: false,
  })
  nftTokenId: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'URL of the NFT image associated with the achievement.',
    example: 'https://example.com/nft.png',
    required: false,
  })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({
    description: 'Progress made toward completing the achievement.',
    example: 5,
  })
  progress: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({
    description: 'Target value to unlock the achievement.',
    example: 10,
  })
  target: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date and time when the achievement was unlocked.',
    example: '2025-02-18T08:00:00Z',
    type: String,
  })
  unlockedAt: Date;
}
