import { Injectable } from '@nestjs/common';
import { BaseHandler } from '../handlers/base-handler';

@Injectable()
export class RareNFTHandler implements BaseHandler {
  async checkCriteria(
    userId: number,
    criteria: Record<string, any>,
  ): Promise<boolean> {
    if (
      this.handleGrandMaster(
        criteria.totalQuizzesCompleted,
        criteria.highAccuracyQuizzes,
      )
    )
      return true;
    if (this.handlePerfectRun(criteria.totalQuestions, criteria.correctAnswers))
      return true;
    if (this.handleKnowledgeLegend(criteria.allAchievementsEarned)) return true;

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

  // "Grand Master" - Complete all quizzes with 90%+ accuracy
  private handleGrandMaster(
    totalQuizzesCompleted: number,
    highAccuracyQuizzes: number,
  ): boolean {
    return (
      totalQuizzesCompleted > 0 &&
      highAccuracyQuizzes / totalQuizzesCompleted >= 0.9
    );
  }

  // "Perfect Run" - Complete an entire quiz with no wrong answers
  private handlePerfectRun(
    totalQuestions: number,
    correctAnswers: number,
  ): boolean {
    return totalQuestions === correctAnswers;
  }

  // "Knowledge Legend" - Earn all other achievements
  private handleKnowledgeLegend(allAchievementsEarned: boolean): boolean {
    return allAchievementsEarned;
  }
}
