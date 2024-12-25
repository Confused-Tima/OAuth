import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const AccessTokenConfigs = registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.OAUTH_JWT_ACCESS_SECRET,
    signOptions: { expiresIn: process.env.OAUTH_JWT_ACCESS_EXPIRES_IN },
  }),
);

export const RefreshTokenConfigs = registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.OAUTH_JWT_REFRESH_SECRET,
    expiresIn: process.env.OAUTH_JWT_REFRESh_EXPIRES_IN,
  }),
);
