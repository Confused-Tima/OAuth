import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
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
        ssl: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
