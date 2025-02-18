import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Puzzle } from "../../puzzles/entities/puzzle.entity";

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    order: number;

    @Column('text', { array: true, default: [], nullable: true })
    hints: string[];

    @ManyToOne(() => Puzzle, (puzzle) => puzzle.steps)
    puzzle: Puzzle;

    @Column({default: false})
    isCorrect?: boolean;
}    

