import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

const customConfigs = () => ({
  // Permission and Group Constants
  PERMISSION_READ: 'READ',
  PERMISSION_WRITE: 'WRITE',
  GROUP_READ_WRITE: 'READ/WRITE',
  GROUP_READERS: 'READERS',
  GROUP_BLOCKED: 'BLOCKED',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [customConfigs],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('OAUTH_PG_HOST'),
        port: +configService.get<string>('OAUTH_PG_PORT'),
        username: configService.get<string>('OAUTH_PG_USER'),
        password: configService.get<string>('OAUTH_PG_PASS'),
        database: configService.get<string>('OAUTH_PG_DB'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: false,
        ssl: configService.get<boolean>('OAUTH_PG_SSL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
