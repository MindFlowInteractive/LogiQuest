import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity()
  export class Score {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.scores, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column()
    category: string;
  
    @Column('int')
    score: number;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  