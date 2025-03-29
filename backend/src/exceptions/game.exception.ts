import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class GameErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Invalid game action' })
  error: string;

  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  timestamp: string;
}

export class GameException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(
      {
        statusCode: statusCode,
        error: message,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
