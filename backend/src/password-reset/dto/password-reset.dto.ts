import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'muhammad@example.com', description: 'Email address of the user requesting a password reset' })
  email: string;
}
