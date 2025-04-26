import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Quiz } from "./entities/quiz.entity"
import { Question } from "./entities/question.entity"
import { CreateQuizDto } from "./dto/create-quiz.dto"
import { UpdateQuizDto } from "./dto/update-quiz.dto"

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(query: any): Promise<{ quizzes: Quiz[]; total: number }> {
    const take = query.limit || 10
    const skip = query.page ? (query.page - 1) * take : 0

    const [quizzes, total] = await this.quizRepository.findAndCount({
      where: {
        ...(query.category && { category: query.category }),
        ...(query.difficulty && { difficulty: query.difficulty }),
        ...(query.isActive !== undefined && { isActive: query.isActive }),
      },
      order: { createdAt: "DESC" },
      take,
      skip,
      relations: ["questions"],
    })

    return { quizzes, total }
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ["questions"],
    })

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`)
    }

    return quiz
  }

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto)

    if (createQuizDto.questions && createQuizDto.questions.length > 0) {
      quiz.questions = createQuizDto.questions.map((questionDto) =>
        this.questionRepository.create({
          ...questionDto,
          quiz,
        }),
      )
    }

    return this.quizRepository.save(quiz)
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id)

    // Update basic quiz properties
    Object.assign(quiz, {
      title: updateQuizDto.title ?? quiz.title,
      description: updateQuizDto.description ?? quiz.description,
      category: updateQuizDto.category ?? quiz.category,
      difficulty: updateQuizDto.difficulty ?? quiz.difficulty,
      isActive: updateQuizDto.isActive ?? quiz.isActive,
    })

    // If questions are provided, replace existing ones
    if (updateQuizDto.questions) {
      // Remove existing questions
      if (quiz.questions && quiz.questions.length > 0) {
        await this.questionRepository.remove(quiz.questions)
      }

      // Create new questions
      quiz.questions = updateQuizDto.questions.map((questionDto) =>
        this.questionRepository.create({
          ...questionDto,
          quiz,
        }),
      )
    }

    return this.quizRepository.save(quiz)
  }

  async remove(id: number): Promise<void> {
    const quiz = await this.findOne(id)
    await this.quizRepository.remove(quiz)
  }

  async bulkImportQuestions(quizId: number, questions: any[]): Promise<Quiz> {
    const quiz = await this.findOne(quizId)
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`)
    }
    if (!questions || questions.length === 0) {
      throw new Error("No questions provided for import")
    }
    const newQuestions = questions.map((questionData) =>
      this.questionRepository.create({
        ...questionData,
        quiz,
      }),
    )

    quiz.questions = [...quiz.questions, ...newQuestions].flat()
    return this.quizRepository.save(quiz)
  }
}

