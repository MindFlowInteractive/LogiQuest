import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { RBACService } from '../services/rbac.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private rbacService: RBACService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any): Promise<User|any> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User account is inactive');

    // Attach permissions to user object
    const permissions = await this.rbacService.getUserPermissions(user);
    return {
      ...user,
      permissions,
    };
  }
}
