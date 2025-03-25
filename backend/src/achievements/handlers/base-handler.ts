
export interface BaseHandler {
  checkCriteria(userId: number, criteria: Record<string, any>): Promise<boolean>;
  trackProgress(userId: number, progress: number, target: number): Promise<void>;
  awardAchievement(userId: number, criteria: Record<string, any>): Promise<void>;
}

