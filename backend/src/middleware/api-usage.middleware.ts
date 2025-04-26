import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiUsageMiddleware implements NestMiddleware {
  private readonly logger = new Logger('ApiUsage');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    
    // After response is sent
    res.on('finish', () => {
      const duration = Date.now() - start;
      
      this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
      
      // Here you could also save API usage statistics to database
    });
    
    next();
  }
}