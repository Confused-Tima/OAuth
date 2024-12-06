import { registerAs } from '@nestjs/config';

export const DatabaseConfigs = registerAs('dbConfigs', () => ({
  type: 'postgres',
  host: process.env.OAUTH_PG_HOST,
  port: +process.env.OAUTH_PG_PORT,
  username: process.env.OAUTH_PG_USER,
  password: process.env.OAUTH_PG_PASS,
  database: process.env.OAUTH_PG_DB,
  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  synchronize: false,
  ssl: ['true', 't'].includes(process.env.OAUTH_PG_SSL.toLowerCase()),
}));
