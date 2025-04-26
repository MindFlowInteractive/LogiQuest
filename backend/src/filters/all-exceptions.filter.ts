import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/exceptions/interfaces/error-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let errorResponse: ErrorResponse = {
      statusCode: status,
      message: 'Internal server error',
      error: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      errorResponse = {
        ...errorResponse,
        ...(typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : (exceptionResponse as object)),
        statusCode: status,
      };
    } else if (exception instanceof Error) {
      // Handle other exceptions
      errorResponse.message = exception.message || 'An unexpected error occurred';
      errorResponse.error = exception.name;
    }

    // Log only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(
        `🚨 ${status} - ${errorResponse.message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(status).json(errorResponse);
  }
}
