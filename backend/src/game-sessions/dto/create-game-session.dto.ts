import { IsNumber, IsNotEmpty } from "class-validator"

export class CreateGameSessionDto {
  @IsNumber()
  @IsNotEmpty()
  userId?: number

  @IsNumber()
  @IsNotEmpty()
  chainId: number
}

