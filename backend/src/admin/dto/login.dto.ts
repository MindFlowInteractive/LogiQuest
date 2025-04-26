import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({ example: "admin@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: "secure_password" })
  @IsNotEmpty()
  @MinLength(8)
  password: string
}

