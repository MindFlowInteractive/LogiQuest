import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, Between } from "typeorm"
import { Quiz } from "../quiz/entities/quiz.entity"
import { UserQuiz } from "../quiz/entities/user-quiz.entity"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserQuiz)
    private userQuizRepository: Repository<UserQuiz>,
  ) {}

  async getDashboardStats(): Promise<any> {
    const totalUsers = await this.userRepository.count()
    const totalQuizzes = await this.quizRepository.count()
    const totalCompletedQuizzes = await this.userQuizRepository.count({ where: { completed: true } })

    // Get active users (users who have taken at least one quiz)
    const activeUsers = await this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.userQuizzes", "userQuiz")
      .groupBy("user.id")
      .having("COUNT(userQuiz.id) > 0")
      .getCount()

    // Get recent registrations (last 7 days)
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const recentRegistrations = await this.userRepository.count({
      where: {
        createdAt: Between(lastWeek, new Date()),
      },
    })

    return {
      totalUsers,
      activeUsers,
      recentRegistrations,
      totalQuizzes,
      totalCompletedQuizzes,
    }
  }

  async getUserStats(): Promise<any> {
    // Get user registration over time (grouped by month)
    const userRegistrations = await this.userRepository
      .createQueryBuilder("user")
      .select("DATE_TRUNC('month', user.createdAt)", "month")
      .addSelect("COUNT(user.id)", "count")
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany()

    // Get user role distribution
    const userRoles = await this.userRepository
      .createQueryBuilder("user")
      .select("user.role", "role")
      .addSelect("COUNT(user.id)", "count")
      .groupBy("user.role")
      .getRawMany()

    return {
      registrationTrend: userRegistrations,
      roleDistribution: userRoles,
    }
  }

  async getQuizStats(): Promise<any> {
    // Get quiz completion rate
    const quizzes = await this.quizRepository.find({
      relations: ["userQuizzes"],
    })

    const quizStats = quizzes.map((quiz) => {
      const totalAttempts = quiz.userQuizzes.length
      const completedAttempts = quiz.userQuizzes.filter((uq) => uq.completed).length
      const completionRate = totalAttempts > 0 ? (completedAttempts / totalAttempts) * 100 : 0
      const averageScore =
        totalAttempts > 0 ? quiz.userQuizzes.reduce((sum, uq) => sum + uq.score, 0) / totalAttempts : 0

      return {
        id: quiz.id,
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        totalAttempts,
        completedAttempts,
        completionRate,
        averageScore,
      }
    })

    // Get category distribution
    const categoryDistribution = await this.quizRepository
      .createQueryBuilder("quiz")
      .select("quiz.category", "category")
      .addSelect("COUNT(quiz.id)", "count")
      .groupBy("quiz.category")
      .getRawMany()

    // Get difficulty distribution
    const difficultyDistribution = await this.quizRepository
      .createQueryBuilder("quiz")
      .select("quiz.difficulty", "difficulty")
      .addSelect("COUNT(quiz.id)", "count")
      .groupBy("quiz.difficulty")
      .getRawMany()

    return {
      quizStats,
      categoryDistribution,
      difficultyDistribution,
    }
  }

  async getUserEngagement(): Promise<any> {
    // Get top performing users
    const topUsers = await this.userQuizRepository
      .createQueryBuilder("userQuiz")
      .leftJoinAndSelect("userQuiz.user", "user")
      .select("user.id", "userId")
      .addSelect("user.name", "userName")
      .addSelect("AVG(userQuiz.score)", "averageScore")
      .addSelect("COUNT(userQuiz.id)", "quizCount")
      .groupBy("user.id")
      .orderBy("averageScore", "DESC")
      .limit(10)
      .getRawMany()

    // Get user activity over time
    const userActivity = await this.userQuizRepository
      .createQueryBuilder("userQuiz")
      .select("DATE_TRUNC('day', userQuiz.takenAt)", "day")
      .addSelect("COUNT(userQuiz.id)", "count")
      .groupBy("day")
      .orderBy("day", "ASC")
      .getRawMany()

    return {
      topUsers,
      userActivity,
    }
  }

  async exportData(): Promise<any> {
    // Export all data for external analysis
    const users = await this.userRepository.find({
      select: ["id", "username", "email", "role", "isActive", "createdAt"],
    })

    const quizzes = await this.quizRepository.find({
      relations: ["questions"],
    })

    const userQuizzes = await this.userQuizRepository.find({
      relations: ["user", "quiz"],
    })

    return {
      users,
      quizzes,
      userQuizzes,
    }
  }
}

