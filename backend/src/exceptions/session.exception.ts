import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class SessionErrorResponse {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Session expired or invalid' })
  error: string;

  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  timestamp: string;
}

export class SessionException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: message,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
