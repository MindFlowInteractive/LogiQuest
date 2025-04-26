import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameSessionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'User ID associated with the game session' })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 5, description: 'Blockchain chain ID where the game session is being created' })
  chainId: number;
}
