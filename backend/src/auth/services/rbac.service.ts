import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RBACService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async getUserPermissions(user: User): Promise<string[]> {
    const role = await this.roleRepository.findOne({
      where: { name: user.role },
    });

    if (!role) return [];

    let permissionNames = role.permissions || [];
    const permissions = await this.permissionRepository.find({
      where: { name: In(permissionNames) },
    });

    const inheritedPermissions = permissions.flatMap((p) => p.inherits || []);
    permissionNames = [
      ...new Set([...permissionNames, ...inheritedPermissions]),
    ];

    return permissionNames;
  }

  async userHasPermission(
    user: User,
    permissionName: string,
  ): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(user);
    return userPermissions.includes(permissionName);
  }

  async createRole(
    name: string,
    description: string,
    permissions: string[] = [],
  ): Promise<Role> {
    const role = this.roleRepository.create({ name, description, permissions });
    return this.roleRepository.save(role);
  }

  async createPermission(
    name: string,
    description: string,
    inherits: string[] = [],
  ): Promise<Permission> {
    const permission = this.permissionRepository.create({
      name,
      description,
      inherits,
    });
    return this.permissionRepository.save(permission);
  }

  async addPermissionToRole(
    roleName: string,
    permissionName: string,
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) throw new Error('Role not found');

    if (!role.permissions) role.permissions = [];
    if (!role.permissions.includes(permissionName)) {
      role.permissions.push(permissionName);
      return this.roleRepository.save(role);
    }
    return role;
  }
}
