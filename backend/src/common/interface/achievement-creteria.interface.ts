import { CriteriaType } from "../enums/creteria-types.enum";

export interface AchievementCriteria {
  type: CriteriaType;
  value: number | boolean | string;
  category?: string;
}