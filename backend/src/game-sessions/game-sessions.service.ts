import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameSession } from './entities/game-session.entity';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { User } from '../users/entities/user.entity';
import { Logger } from '@nestjs/common';
import { MoreThanOrEqual } from 'typeorm';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';
import { ScoreService } from './score.service';
import { AnswerRecord } from './entities/answer-record.entity';
import { Step } from 'src/steps/entities/step.entity';
import { CreateQuizSessionDto } from './dto/create-quiz-session.dto';
import { UseLifelineDto, LifelineType } from './dto/use-lifeline.dto';

@Injectable()
export class GameSessionsService {
  private readonly logger = new Logger(GameSessionsService.name);
  // Simple in-memory cache as alternative to Redis
  private sessionCache = new Map<
    number,
    { data: GameSession; timestamp: number }
  >();

  constructor(
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Puzzle)
    private puzzleRepository: Repository<Puzzle>,
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
    private scoreService: ScoreService,
  ) {}

  private cacheGameSession(gameSession: GameSession): void {
    try {
      this.sessionCache.set(gameSession.id, {
        data: gameSession,
        timestamp: Date.now() + 3600000, // 1 hour expiration
      });
    } catch (error) {
      this.logger.error(
        `Failed to cache game session: ${error.message}`,
        error.stack,
      );
    }
  }

  private getCachedGameSession(id: number): GameSession | null {
    try {
      const cached = this.sessionCache.get(id);
      if (cached && cached.timestamp > Date.now()) {
        return cached.data;
      }

      // Remove expired entry
      if (cached) {
        this.sessionCache.delete(id);
      }

      return null;
    } catch (error) {
      this.logger.error(
        `Failed to get cached game session: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  async findAll(): Promise<GameSession[]> {
    return this.gameSessionRepository.find();
  }

  async findActiveByUser(userId: number): Promise<GameSession[]> {
    return this.gameSessionRepository.find({
      where: { user: { id: userId }, status: 'active' },
    });
  }

  async getSessionHistory(userId: number): Promise<GameSession[]> {
    return this.gameSessionRepository.find({
      where: { user: { id: userId }, status: 'completed' },
      order: { completedAt: 'DESC' },
    });
  }

  async completeSession(id: number): Promise<GameSession> {
    const gameSession = await this.findGameSessionOne(id);
    if (!gameSession) {
      throw new NotFoundException(`GameSession with ID ${id} not found`);
    }

    gameSession.status = 'completed';
    gameSession.isCompleted = true;
    gameSession.completedAt = new Date();

    // Calculate final score if needed
    if (gameSession.answerHistory && gameSession.answerHistory.length > 0) {
      // Update average response time
      const totalResponseTime = gameSession.answerHistory.reduce(
        (sum, record) => sum + record.responseTime,
        0,
      );
      gameSession.averageResponseTime =
        totalResponseTime / gameSession.answerHistory.length;
    }

    const savedSession = await this.gameSessionRepository.save(gameSession);
    this.sessionCache.delete(id); // Remove from cache
    return savedSession;
  }

  async remove(id: number): Promise<void> {
    await this.gameSessionRepository.delete(id);
    this.sessionCache.delete(id); // Remove from cache
  }

  async update(
    id: number,
    updateData: Partial<GameSession>,
  ): Promise<GameSession> {
    const gameSession = await this.gameSessionRepository.findOne({
      where: { id },
    });
    if (!gameSession) {
      throw new NotFoundException(`GameSession with ID ${id} not found`);
    }
    Object.assign(gameSession, updateData);
    const updatedSession = await this.gameSessionRepository.save(gameSession);
    this.cacheGameSession(updatedSession);
    return updatedSession;
  }

  async create(
    createGameSessionDto: CreateGameSessionDto,
  ): Promise<GameSession> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createGameSessionDto.userId },
      });
      const puzzle = await this.puzzleRepository.findOne({
        where: { id: createGameSessionDto.chainId },
      });

      if (!user || !puzzle) {
        throw new NotFoundException('User or Puzzle not found');
      }

      const gameSession = this.gameSessionRepository.create({
        user,
        puzzle,
        currentStep: 0,
        score: 0,
        status: 'active',
        attempts: 0,
        currentScore: 0,
        answerHistory: [],
        streakCount: 0,
        isCompleted: false,
        correctAnswers: 0,
        incorrectAnswers: 0,
      });

      const savedSession = await this.gameSessionRepository.save(gameSession);
      await this.cacheGameSession(savedSession);
      return savedSession;
    } catch (error) {
      this.logger.error(
        `Failed to create game session: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create game session');
    }
  }

  async createQuizSession(
    createQuizSessionDto: CreateQuizSessionDto,
  ): Promise<GameSession> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createQuizSessionDto.userId },
      });
      const puzzle = await this.puzzleRepository.findOne({
        where: { id: createQuizSessionDto.chainId },
      });

      if (!user || !puzzle) {
        throw new NotFoundException('User or Puzzle not found');
      }

      const gameSession = this.gameSessionRepository.create({
        user,
        puzzle,
        currentStep: 0,
        score: 0,
        status: 'active',
        attempts: 0,
        currentScore: 0,
        answerHistory: [],
        streakCount: 0,
        isCompleted: false,
        categoryId: createQuizSessionDto.categoryId,
        correctAnswers: 0,
        incorrectAnswers: 0,
        isFiftyFiftyUsed: false,
        isAskFriendUsed: false,
        isAudiencePollUsed: false,
      });

      const savedSession = await this.gameSessionRepository.save(gameSession);
      await this.cacheGameSession(savedSession);
      return savedSession;
    } catch (error) {
      this.logger.error(
        `Failed to create quiz session: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create quiz session');
    }
  }

  async findOne(id: number): Promise<GameSession> {
    try {
      const cachedSession = await this.getCachedGameSession(id);
      if (cachedSession) {
        return cachedSession;
      }

      const gameSession = await this.gameSessionRepository.findOne({
        where: { id },
        relations: ['user', 'puzzle'],
      });

      if (!gameSession) {
        throw new NotFoundException(`Game session with ID "${id}" not found`);
      }

      await this.cacheGameSession(gameSession);
      return gameSession;
    } catch (error) {
      this.logger.error(
        `Failed to find game session: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find game session');
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleSessionTimeouts() {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const timedOutSessions = await this.gameSessionRepository.find({
        where: {
          status: 'active',
          lastActive: MoreThanOrEqual(thirtyMinutesAgo),
        },
      });

      for (const session of timedOutSessions) {
        session.status = 'abandoned';
        await this.gameSessionRepository.save(session);
        // Remove from cache
        this.sessionCache.delete(session.id);
      }

      this.logger.log(
        `Handled timeouts for ${timedOutSessions.length} sessions`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to handle session timeouts: ${error.message}`,
        error.stack,
      );
    }
  }

  async findGameSessionOne(id: number): Promise<GameSession> {
    // Try cache first
    const cachedSession = this.getCachedGameSession(id);
    if (cachedSession) return cachedSession;

    // Use a simple findOneBy instead of a complex query that might be referencing "chain"
    const gameSession = await this.gameSessionRepository.findOneBy({ id });

    if (!gameSession) {
      this.logger.error(
        `Failed to find game session: Game session with ID ${id} not found`,
      );
      throw new NotFoundException(`Game session with ID ${id} not found`);
    }

    // Cache the result
    this.cacheGameSession(gameSession);
    return gameSession;
  }

  async saveGameSession(gameSession: GameSession): Promise<GameSession> {
    const savedSession = await this.gameSessionRepository.save(gameSession);
    this.cacheGameSession(savedSession);
    return savedSession;
  }

  async submitAnswer(
    gameSessionId: string | number,
    stepId: number,
    answer: string,
    responseTime: number,
    lifelinesUsed?: string[],
  ): Promise<{
    isCorrect: boolean;
    pointsAwarded: number;
    currentScore: number;
    feedback?: string;
    nextStep?: number;
    isCompleted?: boolean;
  }> {
    // Ensure gameSessionId is a number
    const sessionId =
      typeof gameSessionId === 'string'
        ? Number.parseInt(gameSessionId)
        : gameSessionId;

    // Retrieve game session
    const gameSession = await this.findGameSessionOne(sessionId);
    if (!gameSession) {
      throw new NotFoundException(
        `Game session with ID ${gameSessionId} not found`,
      );
    }

    // Get the correct step info
    const step = await this.getStepInfo(stepId);

    // Check if the answer is correct
    const isCorrect = this.checkAnswer(answer, step.correctAnswer);

    // Update streak
    let streakCount = gameSession.streakCount || 0;
    if (isCorrect) {
      streakCount++;
      gameSession.correctAnswers = (gameSession.correctAnswers || 0) + 1;
    } else {
      streakCount = 0;
      gameSession.incorrectAnswers = (gameSession.incorrectAnswers || 0) + 1;
    }

    // Calculate points
    const pointsAwarded = this.scoreService.calculateScore(
      isCorrect,
      responseTime,
      step.difficulty,
      streakCount,
    );

    // Create an answer record
    const answerRecord: AnswerRecord = {
      stepId,
      answer,
      isCorrect,
      responseTime,
      timestamp: new Date(),
      pointsAwarded,
      lifelinesUsed,
    };

    // Update game session
    gameSession.answerHistory = gameSession.answerHistory || [];
    gameSession.answerHistory.push(answerRecord);
    gameSession.currentScore = (gameSession.currentScore || 0) + pointsAwarded;
    gameSession.score = gameSession.currentScore; // Keep score and currentScore in sync
    gameSession.streakCount = streakCount;
    gameSession.lastActive = new Date();

    // Determine if this was the last question
    const isLastQuestion = await this.isLastQuestion(
      gameSession.puzzle.id,
      stepId,
    );
    let isCompleted = false;
    let nextStep = null;

    if (isLastQuestion) {
      gameSession.isCompleted = true;
      gameSession.status = 'completed';
      gameSession.completedAt = new Date();
      isCompleted = true;
    } else {
      // Get the next step
      nextStep = await this.getNextStep(gameSession.puzzle.id, stepId);
      gameSession.currentStep = nextStep;
    }

    // Save the updated game session
    await this.saveGameSession(gameSession);

    return {
      isCorrect,
      pointsAwarded,
      currentScore: gameSession.currentScore,
      feedback: isCorrect ? step.Feedback : null,
      nextStep,
      isCompleted,
    };
  }

  private checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    // Normalize and compare answers
    return (
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  }

  private async getStepInfo(stepId: number) {
    const step = await this.stepRepository.findOne({
      where: { id: stepId },
      relations: ['puzzle'], // Include any needed relations
    });
    if (!step) throw new NotFoundException(`Step with ID ${stepId} not found`);
    return step;
  }

  private async isLastQuestion(
    puzzleId: number,
    currentStepId: number,
  ): Promise<boolean> {
    // Get all steps for this puzzle
    const steps = await this.stepRepository.find({
      where: { puzzle: { id: puzzleId } },
      order: { id: 'ASC' },
    });

    // Check if current step is the last one
    return steps.length > 0 && steps[steps.length - 1].id === currentStepId;
  }

  private async getNextStep(
    puzzleId: number,
    currentStepId: number,
  ): Promise<number> {
    // Get all steps for this puzzle
    const steps = await this.stepRepository.find({
      where: { puzzle: { id: puzzleId } },
      order: { id: 'ASC' },
    });

    // Find the index of the current step
    const currentIndex = steps.findIndex((step) => step.id === currentStepId);

    // Return the next step ID if it exists
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      return steps[currentIndex + 1].id;
    }

    // If no next step, return the current one
    return currentStepId;
  }

  async useLifeline(
    gameSessionId: number,
    lifelineDto: UseLifelineDto,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    const gameSession = await this.findGameSessionOne(gameSessionId);
    if (!gameSession) {
      throw new NotFoundException(
        `Game session with ID ${gameSessionId} not found`,
      );
    }

    // Check if lifeline is already used
    if (
      (lifelineDto.lifelineType === LifelineType.FIFTY_FIFTY &&
        gameSession.isFiftyFiftyUsed) ||
      (lifelineDto.lifelineType === LifelineType.ASK_FRIEND &&
        gameSession.isAskFriendUsed) ||
      (lifelineDto.lifelineType === LifelineType.AUDIENCE_POLL &&
        gameSession.isAudiencePollUsed)
    ) {
      return {
        success: false,
        data: null,
        message: `The ${lifelineDto.lifelineType} lifeline has already been used in this session.`,
      };
    }

    // Get the step information
    const step = await this.getStepInfo(lifelineDto.stepId);

    // Mark lifeline as used
    switch (lifelineDto.lifelineType) {
      case LifelineType.FIFTY_FIFTY:
        gameSession.isFiftyFiftyUsed = true;
        break;
      case LifelineType.ASK_FRIEND:
        gameSession.isAskFriendUsed = true;
        break;
      case LifelineType.AUDIENCE_POLL:
        gameSession.isAudiencePollUsed = true;
        break;
    }

    // Save the updated session
    await this.saveGameSession(gameSession);

    // Generate lifeline data based on the type
    let lifelineData = null;

    switch (lifelineDto.lifelineType) {
      case LifelineType.FIFTY_FIFTY:
        lifelineData = this.generateFiftyFiftyData(step);
        break;
      case LifelineType.ASK_FRIEND:
        lifelineData = this.generateAskFriendData(step);
        break;
      case LifelineType.AUDIENCE_POLL:
        lifelineData = this.generateAudiencePollData(step);
        break;
    }

    return {
      success: true,
      data: lifelineData,
      message: `${lifelineDto.lifelineType} lifeline used successfully.`,
    };
  }

  private generateFiftyFiftyData(step: Step): { eliminatedOptions: string[] } {
    // Assuming step has options property with all possible answers
    const allOptions = step.options || [];
    const correctAnswer = step.correctAnswer;

    // Filter out the correct answer
    const incorrectOptions = allOptions.filter(
      (option) => option !== correctAnswer,
    );

    // Randomly select half of the incorrect options to eliminate
    const shuffled = incorrectOptions.sort(() => 0.5 - Math.random());
    const eliminatedCount = Math.floor(incorrectOptions.length / 2);
    const eliminatedOptions = shuffled.slice(0, eliminatedCount);

    return { eliminatedOptions };
  }

  private generateAskFriendData(step: Step): {
    friendAnswer: string;
    confidence: number;
  } {
    const correctAnswer = step.correctAnswer;

    // 70% chance the friend gives the correct answer
    const isCorrect = Math.random() < 0.7;
    const confidence = Math.floor(Math.random() * 40) + 60; // 60-100% confidence

    if (isCorrect) {
      return { friendAnswer: correctAnswer, confidence };
    } else {
      // Pick a random incorrect answer
      const allOptions = step.options || [];
      const incorrectOptions = allOptions.filter(
        (option) => option !== correctAnswer,
      );
      const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
      return { friendAnswer: incorrectOptions[randomIndex], confidence };
    }
  }

  private generateAudiencePollData(step: Step): {
    pollResults: { option: string; percentage: number }[];
  } {
    const correctAnswer = step.correctAnswer;
    const allOptions = step.options || [];

    // Assign higher percentage to correct answer
    const correctPercentage = Math.floor(Math.random() * 30) + 40; // 40-70%

    // Distribute remaining percentage among incorrect options
    const remainingPercentage = 100 - correctPercentage;
    const incorrectOptions = allOptions.filter(
      (option) => option !== correctAnswer,
    );

    const pollResults = [];

    // Add correct answer with its percentage
    pollResults.push({ option: correctAnswer, percentage: correctPercentage });

    // Distribute remaining percentage among incorrect options
    let remainingToDistribute = remainingPercentage;
    for (let i = 0; i < incorrectOptions.length; i++) {
      if (i === incorrectOptions.length - 1) {
        // Last option gets whatever is left
        pollResults.push({
          option: incorrectOptions[i],
          percentage: remainingToDistribute,
        });
      } else {
        // Random percentage for this option
        const percentage = Math.floor(Math.random() * remainingToDistribute);
        pollResults.push({ option: incorrectOptions[i], percentage });
        remainingToDistribute -= percentage;
      }
    }

    return { pollResults };
  }

  async getQuizSessionStats(userId: number): Promise<any> {
    try {
      // Get all completed quiz sessions for the user
      const completedSessions = await this.gameSessionRepository.find({
        where: { user: { id: userId }, status: 'completed' },
      });

      if (completedSessions.length === 0) {
        return {
          totalQuizzes: 0,
          averageScore: 0,
          highestScore: 0,
          totalCorrectAnswers: 0,
          totalIncorrectAnswers: 0,
          averageResponseTime: 0,
        };
      }

      // Calculate statistics
      const totalQuizzes = completedSessions.length;
      const totalScore = completedSessions.reduce(
        (sum, session) => sum + session.score,
        0,
      );
      const averageScore = totalScore / totalQuizzes;
      const highestScore = Math.max(
        ...completedSessions.map((session) => session.score),
      );

      const totalCorrectAnswers = completedSessions.reduce(
        (sum, session) => sum + (session.correctAnswers || 0),
        0,
      );
      const totalIncorrectAnswers = completedSessions.reduce(
        (sum, session) => sum + (session.incorrectAnswers || 0),
        0,
      );

      // Calculate average response time across all sessions
      let totalResponseTime = 0;
      let totalAnswers = 0;

      completedSessions.forEach((session) => {
        if (session.answerHistory && session.answerHistory.length > 0) {
          totalAnswers += session.answerHistory.length;
          totalResponseTime += session.answerHistory.reduce(
            (sum, record) => sum + record.responseTime,
            0,
          );
        }
      });

      const averageResponseTime =
        totalAnswers > 0 ? totalResponseTime / totalAnswers : 0;

      return {
        totalQuizzes,
        averageScore,
        highestScore,
        totalCorrectAnswers,
        totalIncorrectAnswers,
        averageResponseTime,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get quiz stats: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve quiz statistics',
      );
    }
  }
}
