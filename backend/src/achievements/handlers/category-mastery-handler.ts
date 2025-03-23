import { Injectable } from '@nestjs/common';
import { BaseHandler } from '../handlers/base-handler';

@Injectable()
export class CategoryHandler implements BaseHandler {
  async checkCriteria(
    userId: number,
    criteria: Record<string, any>,
  ): Promise<boolean> {
    if (
      this.handleCompleteAllQuizzes(
        criteria.categoryQuizzesCompleted,
        criteria.totalQuizzesInCategory,
      )
    )
      return true;

    if (
      this.handleHighAccuracy(criteria.correctAnswers, criteria.totalQuestions)
    )
      return true;

    if (this.handleScoreInCategory(criteria.score, criteria.threshold))
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

  // Complete all quizzes in a specific category
  private handleCompleteAllQuizzes(
    categoryQuizzesCompleted: number,
    totalQuizzesInCategory: number,
  ): boolean {
    return categoryQuizzesCompleted === totalQuizzesInCategory;
  }

  // Answer 90% of questions correctly in a category
  private handleHighAccuracy(
    correctAnswers: number,
    totalQuestions: number,
  ): boolean {
    const accuracy = (correctAnswers / totalQuestions) * 100;
    return accuracy >= 90;
  }

  // Earn a certain score in each category
  private handleScoreInCategory(score: number, threshold: number): boolean {
    return score >= threshold;
  }
}
