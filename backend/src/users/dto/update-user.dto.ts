import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'The updated password of the user',
  })
  password?: string;

  @ApiPropertyOptional({
    example: '0x123456789abcdef0123456789abcdef0123456789',
    description: 'The updated wallet address of the user',
  })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @IsOptional()
  @IsObject()
  profileCustomization?: {
    theme?: 'light' | 'dark' | 'system';
    avatarUrl?: string;
    bio?: string;
  };

  @IsOptional()
  @IsNumber()
  totalScore?: number;
}
