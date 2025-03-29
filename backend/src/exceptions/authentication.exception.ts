import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class AuthenticationErrorResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized access' })
  error: string;

  @ApiProperty({ example: '2025-03-27T12:00:00.000Z' })
  timestamp: string;
}

export class AuthenticationException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: message,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
