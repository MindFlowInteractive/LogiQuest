import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Step } from "../../steps/entities/step.entity";


@Entity()
export class Puzzle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    difficulty: number; 

    @Column()
    points: number;

    @Column({ type: "jsonb", nullable: true }) // 
    metadata: Record<string, any>;

    @OneToMany(() => Step, (step) => step.puzzle)
    steps: Step[];

    @Column()
    category: string;
}
