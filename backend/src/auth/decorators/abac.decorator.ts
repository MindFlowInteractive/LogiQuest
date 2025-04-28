import { SetMetadata } from '@nestjs/common';

export const ABAC_KEY = 'abac_policy';
export const Abac = (policy: any) => SetMetadata(ABAC_KEY, policy);
