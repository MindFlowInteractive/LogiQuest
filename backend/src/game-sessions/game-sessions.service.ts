import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameSession } from './entities/game-session.entity';
import type { CreateGameSessionDto } from './dto/create-game-session.dto';
import { User } from '../users/entities/user.entity';
import { Logger } from '@nestjs/common';
import { MoreThanOrEqual } from 'typeorm';
import { Puzzle } from 'src/puzzles/entities/puzzle.entity';
import { AnswerHistory } from './entities/answer-history.entity';
import { LifelineUsage } from './entities/lifeLineUsage.entity';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

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
    });
  }

  async completeSession(id: number): Promise<void> {
    await this.gameSessionRepository.update(id, { status: 'completed' });
  }

  async remove(id: number): Promise<void> {
    await this.gameSessionRepository.delete(id);
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
    return this.gameSessionRepository.save(gameSession);
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
        attempts: 1,
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

  async findOne(id: number): Promise<GameSession> {
    try {
      const cachedSession = await this.getCachedGameSession(id);
      if (cachedSession) {
        return cachedSession;
      }

      const gameSession = await this.gameSessionRepository.findOne({
        where: { id },
        relations: ['user', 'chain'],
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

  // Logic for tracking answer history
  async trackAnswer(sessionId: number, answer: AnswerHistory) {
    const session = await this.gameSessionRepository.findOne({
      where: { id: sessionId },
    });
    session.answerHistory.push(answer);

    if (answer.isCurrect) {
      session.currectAnswers += 1;
    } else {
      session.incorrectAnswers += 1;
    }

    return this.gameSessionRepository.save(session);
  }

  // Logic for trackingLife Line Usage
  async trackLifelineUsage(sessionId: number, lifeline: LifelineUsage) {
    const session = await this.gameSessionRepository.findOne({
      where: { id: sessionId },
    });
    session.lifeLineUsed.push(lifeline);
    return this.gameSessionRepository.save(session);
  }

  async processAnswer(sessionId: number, answerDto: SubmitAnswerDto) {
    const session = await this.gameSessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) throw new NotFoundException('Game session not found');

    const isCorrect = await this.processAnswer(answerDto.questionId, answerDto);

    session.answerHistory.push({
      questionId: answerDto.questionId,
      answerText: answerDto.answer,
      isCurrect: isCorrect,
      id: 0,
      gameSession: new GameSession(),
      submittedAt: undefined,
    });

    if (isCorrect) {
      session.currectAnswers += 1;
    } else {
      session.incorrectAnswers += 1;
    }

    await this.gameSessionRepository.save(session);
    return { message: 'Answer submitted', correct: isCorrect };
  }
}
