import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsEnum(['public', 'private', 'friends'])
  @IsOptional()
  profileVisibility?: 'public' | 'private' | 'friends';
}
