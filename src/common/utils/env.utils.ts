import { Environment } from '../configs';

/**
 * Returns correct file-name/file-path as per the enviornment
 * @returns String with .env file path
 */
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
