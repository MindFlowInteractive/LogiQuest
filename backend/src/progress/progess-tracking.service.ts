/* eslint-disable @typescript-eslint/no-unused-vars */
// src/progress/progress.service.ts
import { Injectable } from '@nestjs/common';
import { GameSession } from '../game-sessions/entities/game-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


export interface ProgressStats {
    overallCompletion: number;
    totalQuizzesAttempted: number;
    totalQuizzesCompleted: number;
    averageScore: number;
  }
  
  export interface CategoryProgress {
    categoryId: string;
    categoryName: string;
    completionPercentage: number;
    highestScore: number;
    quizzesCompleted: number;
  }

@Injectable()
export class ProgressTrackingService {
    constructor(
        @InjectRepository(GameSession)
        private gameSessionRepository: Repository<GameSession>,
      ) {}
    
      async getUserProgress(userId: string): Promise<ProgressStats> {
        // Query game sessions for this user
        const sessions = await this.gameSessionRepository.find({
          where: { id: parseInt(userId) },
        });
        
        // Calculate stats based on sessions
        const totalAttempted = sessions.length;
        const totalCompleted = sessions.filter(s => s.isCompleted).length;
        const totalScore = sessions.reduce((sum, s) => sum + (s.currentScore || 0), 0);
        const averageScore = totalAttempted > 0 ? totalScore / totalAttempted : 0;
        
        return {
          overallCompletion: this.calculateCompletionPercentage(totalCompleted, totalAttempted),
          totalQuizzesAttempted: totalAttempted,
          totalQuizzesCompleted: totalCompleted,
          averageScore: Math.round(averageScore),
        };
      }

    async getCategoryProgress(userId: string): Promise<CategoryProgress[]> {
    // Retrieve category progress data
    return [
        {
        categoryId: 'science',
        categoryName: 'Science',
        completionPercentage: 80,
        highestScore: 950,
        quizzesCompleted: 4,
        },
        // Other categories
    ];
    }

  // Calculate completion percentage
  private calculateCompletionPercentage(completed: number, total: number): number {
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }
}
