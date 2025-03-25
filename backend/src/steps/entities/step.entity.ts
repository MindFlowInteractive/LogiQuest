import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Puzzle } from "../../puzzles/entities/puzzle.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Step {
    @ApiProperty({
        type: 'number',
        description: 'Unique identifier for the step',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        type: 'string',
        description: 'Description of the step',
    })
    @Column()
    description: string;

    @ApiProperty({
        type: 'number',
        description: 'Order of the step in the LogiQuest',
    })
    @Column()
    order: number;

    @ApiProperty({
        type: 'array',
        description: 'Hints for solving the step',
        items: { type: 'string' },
    })
    @Column('simple-array', { nullable: true })
    hints: string[];

    @ApiProperty({
        type: 'array',
        description: 'Multiple options for the step',
        items: { type: 'string' },
    })
    @Column('simple-array', { nullable: true })
    options: string[];

    @ApiProperty({
        type: 'string',
        description: 'Correct answer for the step',
    })
    @Column({ nullable: true })
    correctAnswer: string;

    @ManyToOne(() => Puzzle, puzzle => puzzle.steps)
    puzzle: Puzzle;

    @ApiProperty({
        type: 'string',
        description: 'diffculty for the step',
    })
    @Column({ nullable: true })
    difficulty?: string;

    @ApiProperty({
        type: 'string',
        description: 'feedback for the step',
    })
    @Column({ nullable: true })
    Feedback?: string
}
