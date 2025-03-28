/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  isNumber,
  IsNumber,
  IsObject,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importing the @ApiProperty decorator
import { Exclude } from 'class-transformer';
import { CreateDateColumn } from 'typeorm';

export class RegisterDto {
  @IsUUID()
  @IsOptional()
  id?: string; 

  @ApiProperty({
    description:
      'The username of the user, must be between 3 and 20 characters.',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'The email of the user, must be a valid email format.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The total score of the user.',
  })
  @IsOptional()
  @IsNumber()
  totalScore?: number;

  @ApiProperty({
    description: 'The wallet address of the user.',
  })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The timestamp when the user is created',
    example: '2024-02-18T12:34:56.789Z',
  })
  createdAt?: Date;


  @IsOptional()
  @IsObject()
  profileCustomization?: {
    theme?: 'light' | 'dark' | 'system';
    avatarUrl?: string;
    bio?: string;
  };
}

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user.',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
  })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'The access token generated after a successful login.',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User details, excluding the password.',
    type: Object,
    example: { id: 1, username: 'user1' },
  })
  @Exclude() // Exclude from the response
  user: {
    id: number;
    username: string;
  };

  refreshToken: string;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
