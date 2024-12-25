import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenConfigs, RefreshTokenConfigs } from 'src/common/configs';
import { JWTRefreshStragtegy, JWTStragtegy } from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(AccessTokenConfigs.asProvider()),
    ConfigModule.forFeature(AccessTokenConfigs),
    ConfigModule.forFeature(RefreshTokenConfigs),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStragtegy, JWTRefreshStragtegy],
})
export class AuthModule {}
