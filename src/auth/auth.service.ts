import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';

import { verifyPassword } from 'src/common/utils';
import { User } from 'src/entities/user.entity';
import { RefreshTokenConfigs } from 'src/common/configs';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RefreshTokenConfigs.KEY)
    private readonly refreshConfigs: ConfigType<typeof RefreshTokenConfigs>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Checks if the current user is valid or not
   * @param user Unique user object
   * @param password Password of the user
   * @returns boolean
   */
  async validateUser(user: User, password: string): Promise<boolean> {
    return user && (await verifyPassword(user.password, password));
  }

  /**
   * Creates a JWT Access token for the given user
   * @param user Object with user details
   * @returns Access token
   */
  generateAccessToken(user: User): string {
    return this.jwtService.sign(instanceToPlain(user));
  }

  /**
   * Creates a JWT Refresh token for the given user
   * @param user Object with user details
   * @returns Refresh token
   */
  generateRefreshToken(user: User): string {
    return this.jwtService.sign(instanceToPlain(user), this.refreshConfigs);
  }
}
