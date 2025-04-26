import { IsOptional, IsString, IsEmail, IsNotEmpty, IsObject, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Muhammad Auwal',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'muhammad@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'A short biography of the user',
    example: 'Software engineer passionate about open source.',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'johnsmith',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Blockchain wallet address',
    example: '0x1234abcd...',
    required: false,
  })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @ApiProperty({
    description: 'URL to the profile picture',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    description: 'Profile customization settings',
    example: { theme: 'dark', avatarUrl: 'https://example.com/avatar.jpg', bio: 'Hello world' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  profileCustomization?: {
    theme?: 'light' | 'dark' | 'system';
    avatarUrl?: string;
    bio?: string;
  };

  @ApiProperty({
    description: 'Profile visibility setting',
    example: 'public',
    enum: ['public', 'private', 'friends'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['public', 'private', 'friends'])
  profileVisibility?: 'public' | 'private' | 'friends';
}