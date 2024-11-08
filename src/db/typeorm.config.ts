import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getEnvFilePath } from 'src/common/utils';

const envFile = getEnvFilePath();
console.log('> Using Env File:', envFile);

// Loads only the .env file
config({ path: envFile });

// Only fetches the Enviornment Variables
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('OAUTH_PG_HOST'),
  port: configService.get('OAUTH_PG_PORT'),
  username: configService.get('OAUTH_PG_USER'),
  password: configService.get('OAUTH_PG_PASS'),
  database: configService.get('OAUTH_PG_DB'),
  ssl: configService.get('OAUTH_PG_SSL') === 'true',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
