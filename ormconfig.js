import { config } from 'dotenv';

config(); // Load .env file

export default {
  type: 'postgres',
  host: process.env.OAUTH_PG_HOST,
  port: process.env.OAUTH_PG_PORT,
  username: process.env.OAUTH_PG_USER,
  password: process.env.OAUTH_PG_PASS,
  database: process.env.OAUTH_PG_DB,
  entities: [`${__dirname}/src/**/entities/*.entity.{ts,js}`], // Path to entities
  migrations: [`${__dirname}/src/migrations/*.{ts,js}`], // Look for migration here
  cli: {
    migrationsDir: 'src/migrations', // Generate migrations here
  },
  ssl: process.env.OAUTH_PG_SSL,
};
