import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Quiz } from "./quiz.entity"
import { User } from "src/users/entities/user.entity"

@Entity("user_quizzes")
export class UserQuiz {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(
    () => User,
    (user) => user.userQuizzes,
  )
  @JoinColumn({ name: "user_id" })
  user: User

  @ManyToOne(
    () => Quiz,
    (quiz) => quiz.userQuizzes,
  )
  @JoinColumn({ name: "quiz_id" })
  quiz: Quiz

  @Column({ type: "float" })
  score: number

  @Column()
  completed: boolean

  @CreateDateColumn()
  takenAt: Date
}

