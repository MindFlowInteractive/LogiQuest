import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';
import { RBACService } from './services/rbac.service';
import { ABACService } from './services/abac.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { InitializationService } from './services/initialization.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Permission, Role, User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RBACService,
    ABACService,
    AuthorizationGuard,
    AuthorizationMiddleware,
    InitializationService,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    RBACService,
    ABACService,
    AuthorizationGuard,
    AuthorizationMiddleware,
  ],
})
export class AuthModule {}
