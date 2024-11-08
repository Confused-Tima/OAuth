import { Environment } from '../configs';

export function getEnvFilePath(): string {
  const env: Environment =
    (process.env.OAUTH_ENV as Environment) || Environment.DEV;
  switch (env) {
    case Environment.DEV:
      return './.env';
    case Environment.PROD:
      return './env.production.local';
    default:
      return './.env';
  }
}
