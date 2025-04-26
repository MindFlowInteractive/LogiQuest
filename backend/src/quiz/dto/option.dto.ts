import { IsNotEmpty, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class OptionDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean
}

