import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'previous password of the user', example: '@123Password' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'User new password', example: 'SecurePassword123' })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}
