import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_SECRET')
        });
        const user = await this.usersService.findOne(payload.sub);
        if (user) {
          req.user = user;
        }
        console.log(user)
      }
    } catch (e) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
    next();
  }
}
