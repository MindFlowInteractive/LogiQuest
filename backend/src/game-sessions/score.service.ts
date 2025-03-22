// src/game-sessions/services/score.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreService {
  // Base points for correct answers
  private readonly BASE_POINTS = 100;
  
  // Maximum time bonus (for immediate answers)
  private readonly MAX_TIME_BONUS = 50;
  
  // Time threshold for bonus (in seconds)
  private readonly TIME_THRESHOLD = 10;
  
  // Streak bonus multiplier
  private readonly STREAK_MULTIPLIER = 0.1; // 10% bonus per streak
  
  // Difficulty multipliers
  private readonly DIFFICULTY_MULTIPLIERS = {
    easy: 1,
    medium: 1.5,
    hard: 2,
    expert: 3,
  };

  calculateScore(
    isCorrect: boolean,
    responseTime: number,
    difficulty: string,
    streakCount: number,
  ): number {
    if (!isCorrect) {
      return 0;
    }

    // Base points for correct answer
    let score = this.BASE_POINTS;

    // Apply difficulty multiplier
    score *= this.DIFFICULTY_MULTIPLIERS[difficulty] || 1;

    // Apply time bonus (faster = more points)
    const timeBonus = this.calculateTimeBonus(responseTime);
    score += timeBonus;

    // Apply streak bonus
    if (streakCount > 1) {
      const streakBonus = score * ((streakCount - 1) * this.STREAK_MULTIPLIER);
      score += streakBonus;
    }

    return Math.round(score);
  }

  private calculateTimeBonus(responseTime: number): number {
    if (responseTime <= 0) {
      return 0; // Prevent negative or zero response time
    }
    
    // If response time is greater than threshold, no bonus
    if (responseTime > this.TIME_THRESHOLD) {
      return 0;
    }
    
    // Calculate time bonus: faster responses get higher bonus
    // Linear scale from 0 to MAX_TIME_BONUS
    return this.MAX_TIME_BONUS * (1 - responseTime / this.TIME_THRESHOLD);
  }
}