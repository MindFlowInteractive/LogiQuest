import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgressDto, ProgressResponseDto } from './dto/progress.dto';
import { ChainProgress } from './entities/chain.progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(ChainProgress)
    private progressRepository: Repository<ChainProgress>,
  ) {}

  async findOne(id: number): Promise<ProgressResponseDto> {
    const progress = await this.progressRepository.findOne({ where: { id } });
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return {
      chainId: progress.chainId,
      progress: progress.currentStep,
      score: progress.score,
      completed: progress.completed,
      lastAttempt: progress.lastAttemptAt,
    };
  }

  async create(createProgressDto: CreateProgressDto) {
  const progress = this.progressRepository.create(createProgressDto);
  return await this.progressRepository.save(progress);
}
  async updateChainProgress(
    userId: number,
    chainId: number,
    progressStatus: string,
  ) {
    let progress = await this.progressRepository.findOne({
      where: { userId, chainId },
    });

    if (!progress) {
      progress = this.progressRepository.create({
        userId,
        chainId,
        currentStep: 0,
      });
    }

    progress.completed = progressStatus === 'completed';
    await this.progressRepository.save(progress);
    return { message: 'Progress updated' };
  }

  async getUserProgress(userId: number) {
    return this.progressRepository.find({
      where: { userId },
      order: { lastAttemptAt: 'DESC' },
    });
  }

  async getChainProgress(userId: number, chainId: number) {
    const progress = await this.progressRepository.findOne({
      where: { userId, chainId },
    });
    if (!progress) {
      throw new NotFoundException('Chain progress not found');
    }
    return progress;
  }

  async getProgressStats(userId: number) {
    const progress = await this.progressRepository.find({ where: { userId } });
    const completed = progress.filter((p) => p.completed);
    const totalAttempts = progress.reduce((sum, p) => sum + p.attemptsCount, 0);

    return {
      totalCompleted: completed.length,
      averageScore: completed.length
        ? completed.reduce((sum, p) => sum + p.score, 0) / completed.length
        : 0,
      totalAttempts,
      completionRate: progress.length
        ? (completed.length / progress.length) * 100
        : 0,
    };
  }
}