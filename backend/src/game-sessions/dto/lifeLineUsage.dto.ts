import { IsDate, IsInt, IsString } from 'class-validator';
import { GameSession } from '../entities/game-session.entity';

export class LifelineUsageDto {
  id: number;

  @IsString()
  type: string;

  @IsDate()
  usedAt: Date;

  @IsInt()
  session: GameSession;
}
