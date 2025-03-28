import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Here you can do any logic to verify if the request is authenticated
    // For example, check if request.user is defined (from a middleware) or if there's a valid token, etc.

    const request = context.switchToHttp().getRequest();
    // If request.user exists, we assume user is authenticated
    // (This would typically be set by a previous middleware or passport strategy)
    return !!request.user;
  }
}
