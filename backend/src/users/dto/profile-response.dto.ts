import { Exclude, Expose, Type } from 'class-transformer';
import { ProfileCustomizationDto, StatisticsDto } from './user-response.dto';

@Exclude()
export class ProfileResponseDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  walletAddress: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  totalScore: number;

  @Expose()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto;

  @Expose()
  @Type(() => ProfileCustomizationDto)
  profileCustomization: ProfileCustomizationDto;

}
