import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JWTRefreshGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Fetches the user details based on the unique ID and creates a JWT token for the user
   * @param email Unique user email
   * @returns Object with access and refresh token for the user
   */
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.getUserByEmail(email);
    const isValidUser = await this.authService.validateUser(user, password);
    if (!isValidUser) {
      throw new UnauthorizedException(`User with Email: ${email} not found`);
    }
    return {
      accessToken: this.authService.generateAccessToken(user),
      refreshToken: this.authService.generateRefreshToken(user),
    };
  }

  /**
   * Validates the request with the refresh token and generates a new access token
   * @param request HTTP request object
   * @returns Object with newly generated access token
   */
  @UseGuards(JWTRefreshGuard)
  @Post('refresh')
  async refresh(@Request() request) {
    return {
      accessToken: this.authService.generateAccessToken(request.user),
    };
  }
}
