import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppConfigs, DatabaseConfigs, Environment } from './configs';

function getEnvFilePath(): string {
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
      expandVariables: true,
      load: [AppConfigs, DatabaseConfigs],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('dbConfigs'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
