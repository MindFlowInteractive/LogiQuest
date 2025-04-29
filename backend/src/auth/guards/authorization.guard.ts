import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ABAC_KEY } from '../decorators/abac.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { RBACService } from '../services/rbac.service';
import { ABACService } from '../services/abac.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RBACService,
    private abacService: ABACService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;

    // Check for public route decorator first
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is inactive');
    }

    // Check role-based access
    const requiredRoles =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || [];
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role privileges');
    }

    // Check permission-based access
    const requiredPermissions =
      this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler()) || [];
    for (const permission of requiredPermissions) {
      if (!(await this.rbacService.userHasPermission(user, permission))) {
        throw new ForbiddenException(`Missing permission: ${permission}`);
      }
    }

    // Check ABAC policies
    const abacPolicy = this.reflector.get<any>(ABAC_KEY, context.getHandler());
    if (abacPolicy) {
      const resource = request.body || request.params || request.query;
      if (!this.abacService.evaluatePolicy(user, resource, request.method)) {
        throw new ForbiddenException(
          'Access denied based on resource attributes',
        );
      }
    }

    return true;
  }
}
