import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, MoreThanOrEqual } from 'typeorm';

import { GameSession } from './entities/game-session.entity';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { User } from '../users/entities/user.entity';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';
import { AnswerHistory } from './entities/answer-history.entity';
import { LifelineUsage } from './entities/lifeLineUsage.entity';

@Injectable()
export class GameSessionsService {
  private readonly logger = new Logger(GameSessionsService.name);
  private sessionCache = new Map<number, { data: GameSession; timestamp: number }>();

  constructor(
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Puzzle)
    private puzzleRepository: Repository<Puzzle>,

    @InjectRepository(AnswerHistory)
    private answerRepo: Repository<AnswerHistory>,
  ) {}

  private cacheGameSession(gameSession: GameSession): void {
    try {
      this.sessionCache.set(gameSession.id, {
        data: gameSession,
        timestamp: Date.now() + 3600000, // 1 hour expiration
      });
    } catch (error) {
      this.logger.error(`Failed to cache game session: ${error.message}`, error.stack);
    }
  }

  private getCachedGameSession(id: number): GameSession | null {
    try {
      const cached = this.sessionCache.get(id);
      if (cached && cached.timestamp > Date.now()) {
        return cached.data;
      }
      if (cached) this.sessionCache.delete(id);
      return null;
    } catch (error) {
      this.logger.error(`Failed to get cached game session: ${error.message}`, error.stack);
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
    });
  }

  async completeSession(id: number): Promise<void> {
    await this.gameSessionRepository.update(id, { status: 'completed' });
  }

  async remove(id: number): Promise<void> {
    await this.gameSessionRepository.delete(id);
  }

  async update(id: number, updateData: Partial<GameSession>): Promise<GameSession> {
    const gameSession = await this.gameSessionRepository.findOne({ where: { id } });
    if (!gameSession) {
      throw new NotFoundException(`GameSession with ID ${id} not found`);
    }
    Object.assign(gameSession, updateData);
    return this.gameSessionRepository.save(gameSession);
  }

  async create(createGameSessionDto: CreateGameSessionDto): Promise<GameSession> {
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
        attempts: 1,
        correctAnswers: 0,
        incorrectAnswers: 0,
      });

      const savedSession = await this.gameSessionRepository.save(gameSession);
      this.cacheGameSession(savedSession);
      return savedSession;
    } catch (error) {
      this.logger.error(`Failed to create game session: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create game session');
    }
  }

  async findOne(id: number): Promise<GameSession> {
    try {
      const cachedSession = this.getCachedGameSession(id);
      if (cachedSession) return cachedSession;

      const gameSession = await this.gameSessionRepository.findOne({
        where: { id },
        relations: ['user', 'puzzle', 'answerHistory'],
      });

      if (!gameSession) {
        throw new NotFoundException(`Game session with ID "${id}" not found`);
      }

      this.cacheGameSession(gameSession);
      return gameSession;
    } catch (error) {
      this.logger.error(`Failed to find game session: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) throw error;
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
        this.sessionCache.delete(session.id);
      }

      this.logger.log(`Handled timeouts for ${timedOutSessions.length} sessions`);
    } catch (error) {
      this.logger.error(`Failed to handle session timeouts: ${error.message}`, error.stack);
    }
  }

  async trackLifelineUsage(sessionId: number, lifeline: LifelineUsage) {
    const session = await this.gameSessionRepository.findOne({ where: { id: sessionId } });
    session.lifeLineUsed.push(lifeline);
    return this.gameSessionRepository.save(session);
  }

  private async isAnswerCorrect(questionId: number, answerDto: SubmitAnswerDto): Promise<boolean> {
    const puzzle = await this.puzzleRepository.findOne({ where: { id: questionId } });
    if (!puzzle) throw new NotFoundException('Puzzle not found');
    return puzzle.correctAnswer.trim().toLowerCase() === answerDto.answer.trim().toLowerCase();
  }

  async processAnswer(sessionId: number, answerDto: SubmitAnswerDto) {
    const session = await this.gameSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['answerHistory'],
    });

    if (!session) throw new NotFoundException('Game session not found');

    const isCorrect = await this.isAnswerCorrect(answerDto.questionId, answerDto);

    const answerRecord = this.answerRepo.create({
      questionId: answerDto.questionId,
      answerText: answerDto.answer,
      isCurrect: isCorrect,
      submittedAt: new Date(),
      gameSession: session,
    });

    await this.answerRepo.save(answerRecord);

    session.correctAnswers = session.correctAnswers || 0;
    session.incorrectAnswers = session.incorrectAnswers || 0;
    session.score = session.score || 0;

    if (isCorrect) {
      session.correctAnswers += 1;
      session.score += 10; // Award 10 points for correct answer
    } else {
      session.incorrectAnswers += 1;
      session.score -= 5; // Deduct 5 points for wrong answer
      if (session.score < 0) session.score = 0; // Prevent negative score
    }

    await this.gameSessionRepository.save(session);

    return {
      message: 'Answer submitted',
      correct: isCorrect,
      score: session.score,
      correctAnswers: session.correctAnswers,
      incorrectAnswers: session.incorrectAnswers,
    };
  }
}
