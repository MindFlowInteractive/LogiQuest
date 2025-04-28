import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

interface ABACPolicy {
  conditions: {
    attribute: string;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'matches';
    value: any;
  }[];
}

@Injectable()
export class ABACService {
  evaluatePolicy(user: User, resource: any, action: string): boolean {
    // Owner can always access
    if (resource.ownerId && resource.ownerId === user.id) return true;

    // Admin can always access
    if (user.role === 'admin') return true;

    // Check profile visibility
    if (resource.profileVisibility) {
      if (resource.profileVisibility === 'public') return true;
      if (resource.profileVisibility === 'private' && resource.id === user.id)
        return true;
    }

    return false;
  }

  evaluateComplexPolicy(user: User, policy: ABACPolicy): boolean {
    return policy.conditions.every((condition) => {
      const userValue = this.getNestedProperty(user, condition.attribute);
      return this.compareValues(userValue, condition.operator, condition.value);
    });
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }

  private compareValues(a: any, operator: string, b: any): boolean {
    switch (operator) {
      case 'equals':
        return a === b;
      case 'contains':
        return a.includes(b);
      case 'greaterThan':
        return a > b;
      case 'lessThan':
        return a < b;
      case 'matches':
        return new RegExp(b).test(a);
      default:
        return false;
    }
  }
}
