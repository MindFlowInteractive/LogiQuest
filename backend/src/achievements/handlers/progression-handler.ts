import { Injectable, Logger } from '@nestjs/common';
import { BaseHandler } from '../handlers/base-handler';

@Injectable()
export class ProgressionHandler implements BaseHandler {
  private readonly logger = new Logger(ProgressionHandler.name);

  public async checkCriteria(userId: number, criteria: Record<string, any>): Promise<boolean> {
    const { totalQuizzesCompleted, totalCorrectAnswers, score } = criteria;

    if (totalQuizzesCompleted !== undefined) {
      if (this.handleQuizCompletion(totalQuizzesCompleted)) {
        this.logger.log(`User ${userId} completed ${totalQuizzesCompleted} quizzes.`);
        return true;
      }
    }

    if (totalCorrectAnswers !== undefined) {
      if (this.handleCorrectAnswers(totalCorrectAnswers)) {
        this.logger.log(`User ${userId} answered ${totalCorrectAnswers} questions correctly.`);
        return true;
      }
    }

    if (score !== undefined) {
      if (this.handleScoreThreshold(score)) {
        this.logger.log(`User ${userId} reached score threshold of ${score} points.`);
        return true;
      }
    }

    return false;
  }

  public async trackProgress(userId: number, progress: number, target: number): Promise<void> {
    if (progress >= target) {
      this.logger.log(`User ${userId} achieved progress target of ${target}.`);
    }
  }

  public async awardAchievement(userId: number, criteria: Record<string, any>): Promise<void> {
    this.logger.log(`Awarding achievement to User ${userId} with criteria: ${JSON.stringify(criteria)}`);
    // Add logic to store the achievement in the database or perform other actions
  }

  private handleQuizCompletion(totalQuizzesCompleted: number): boolean {
    return [5, 10, 15].includes(totalQuizzesCompleted);
  }

  private handleCorrectAnswers(totalCorrectAnswers: number): boolean {
    return [50, 100, 500].includes(totalCorrectAnswers);
  }

  private handleScoreThreshold(score: number): boolean {
    return [1000, 5000, 10000].includes(score);
  }
}
