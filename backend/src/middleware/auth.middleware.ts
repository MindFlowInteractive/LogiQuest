import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Allow unauthenticated access to public routes
    }
    
    const token = authHeader.substring(7);
    
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET')
      });
      
      // Get full user details including roles
      const user = await this.usersService.findById(payload.sub);
      
      // Attach user to request
      req['user'] = user;
      
      // Check roles for protected routes
      // This replaces the functionality of the RolesGuard
      this.checkRoleAccess(req);
      
      next();
    } catch (error) {
      if (req.path.startsWith('/auth/')) {
        // Don't block auth endpoints
        return next();
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  private checkRoleAccess(req: Request) {
    // Add your role checking logic here
    // Example: Admin-only endpoints
    if (req.path.startsWith('/admin') && req['user'].role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
  }
}