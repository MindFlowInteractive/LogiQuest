import { Injectable, OnModuleInit } from '@nestjs/common';
import { RBACService } from './rbac.service';

@Injectable()
export class InitializationService implements OnModuleInit {
  constructor(private readonly rbacService: RBACService) {}

  async onModuleInit() {
    // await this.initializeDefaultRolesAndPermissions();
  }

  private async initializeDefaultRolesAndPermissions() {
    // Create default permissions
    const permissions = [
      { name: 'view.profile', description: 'Return user profile' },
      { name: 'edit.profile', description: 'Edit user profile' },
      { name: 'change.password', description: 'Change user password' },
      { name: 'upload.avatar', description: 'Upload user avatar' },
      { name: 'all.users', description: 'Return all users' },
      { name: 'delete.user', description: 'Delete a user' },
      { name: 'view.user', description: 'Return a user' },
      {
        name: 'admin.access',
        description: 'Full admin access',
        inherits: [
          'all.users',
          'delete.user',
          'view.user',
        ],
      },
      {
        name: 'user.access',
        description: 'Full user access',
        inherits: [
          'view.profile',
          'edit.profile',
          'change.password',
          'upload.avatar',
        ],
      },
    ];

    for (const perm of permissions) {
      await this.rbacService.createPermission(
        perm.name,
        perm.description,
        perm.inherits,
      );
    }

    // Create default roles
    const roles = [
      {
        name: 'ADMIN',
        description: 'System administrator',
        permissions: ['admin.access'],
      },
      {
        name: 'USER',
        description: 'User manager',
        permissions: ['user.access'],
      },
    ];

    for (const role of roles) {
      await this.rbacService.createRole(
        role.name,
        role.description,
        role.permissions,
      );
    }
  }
}
