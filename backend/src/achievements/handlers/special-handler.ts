import { Injectable } from '@nestjs/common';
import { BaseHandler } from '../handlers/base-handler';

@Injectable()
export class SpecialHandler implements BaseHandler {
  async checkCriteria(
    userId: number,
    criteria: Record<string, any>,
  ): Promise<boolean> {
    if (this.handleFirstTimer(criteria.totalQuizzesCompleted)) return true;
    if (this.handleSpeedDemon(criteria.quickAnswers, criteria.timePerQuestion))
      return true;
    if (this.handleNoLifelines(criteria.usedLifelines)) return true;

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

  // "First Timer" - Complete first quiz
  private handleFirstTimer(totalQuizzesCompleted: number): boolean {
    return totalQuizzesCompleted === 1;
  }

  // "Speed Demon" - Answer 5 questions with less than 2 seconds each
  private handleSpeedDemon(
    quickAnswers: number,
    timePerQuestion: number,
  ): boolean {
    return quickAnswers >= 5 && timePerQuestion <= 2;
  }

  // "No Lifelines" - Complete a quiz without using any lifelines
  private handleNoLifelines(usedLifelines: boolean): boolean {
    return !usedLifelines;
  }
}
