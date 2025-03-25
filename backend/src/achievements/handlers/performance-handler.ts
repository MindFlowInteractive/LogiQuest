import { Injectable } from '@nestjs/common';
import { BaseHandler } from '../handlers/base-handler';

@Injectable()
export class PerformanceHandler implements BaseHandler {
  async checkCriteria(
    userId: number,
    criteria: Record<string, any>,
  ): Promise<boolean> {
    if (this.handlePerfectScore(criteria.score, criteria.maxScore)) return true;
    if (this.handleStreak(criteria.correctAnswersInRow)) return true;
    if (this.handleTimeThreshold(criteria.completionTime, criteria.threshold))
      return true;
    return false;
  }

  async trackProgress(
    userId: number,
    progress: number,
    target: number,
  ): Promise<void> {
    console.log(`Tracking progress for user ${userId}: ${progress}/${target}`);
  }

  async awardAchievement(
    userId: number,
    criteria: Record<string, any>,
  ): Promise<void> {
    console.log(
      `Awarding achievement to user ${userId} for criteria`,
      criteria,
    );
  }

  // Achieve a perfect score on any quiz
  private handlePerfectScore(score: number, maxScore: number): boolean {
    return score === maxScore;
  }

  // Answer 10 questions in a row correctly (streak achievements)
  private handleStreak(correctAnswersInRow: number): boolean {
    return correctAnswersInRow >= 10;
  }

  // Complete a quiz under a time threshold
  private handleTimeThreshold(
    completionTime: number,
    threshold: number,
  ): boolean {
    return completionTime <= threshold;
  }
}
