import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Question } from "./question.entity"
import { UserQuiz } from "./user-quiz.entity"

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: "text" })
  description: string

  @Column()
  category: string

  @Column()
  difficulty: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Question,
    (question) => question.quiz,
    { cascade: true },
  )
  questions: Question[]

  @OneToMany(
    () => UserQuiz,
    (userQuiz) => userQuiz.quiz,
  )
  userQuizzes: UserQuiz[]
}

