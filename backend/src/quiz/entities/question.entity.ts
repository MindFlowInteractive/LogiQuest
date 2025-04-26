import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Quiz } from "./quiz.entity"

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "text" })
  text: string

  @Column("simple-json")
  options: { text: string; isCorrect: boolean }[]

  @Column({ nullable: true })
  explanation: string

  @ManyToOne(
    () => Quiz,
    (quiz) => quiz.questions,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "quiz_id" })
  quiz: Quiz
}

