import { registerAs } from '@nestjs/config';

export enum Environment {
  PROD = 'PROD',
  DEV = 'DEV',
}

export const AppConfigs = registerAs('appConfigs', () => ({
  // Basic configs
  ENV: process.env.OAUTH_ENV as Environment,

  // Permission and Group Constants
  PERMISSION_READ: 'READ',
  PERMISSION_WRITE: 'WRITE',
  GROUP_READ_WRITE: 'READ/WRITE',
  GROUP_READERS: 'READERS',
  GROUP_BLOCKED: 'BLOCKED',
}));
