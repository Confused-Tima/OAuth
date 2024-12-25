import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from 'src/entities/user.entity';
import { JWTGuard } from 'src/common/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Controller to fetch fetch user details based on it's unique ID
   * @param userID Unique user ID
   * @returns Promise of a unqiue user
   */
  @UseGuards(JWTGuard)
  @Get()
  async get(@Request() request, @Query('id') userID: number): Promise<object> {
    if (request.user.id !== userID)
      throw new UnauthorizedException(
        'The user cannot access other user details',
      );
    const user = await this.userService.getUserByID(userID);
    if (!user)
      throw new NotFoundException(`User with ID ${userID} does not exists`);
    return instanceToPlain(user);
  }

  /**
   * Controller for handling request to creates a user out of given details
   * @param createUser User details in format of CreateUserDto
   * @returns Promise of created user
   */
  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.create(createUser);
  }

  /**
   * Controller for handling request update user
   * @param userID Unique user ID
   * @param updateUser Update user details
   * @param updateUserPhone Update user Phone
   * @returns Updated user details
   */
  @UseGuards(JWTGuard)
  @Patch()
  async update(
    @Body('id') userID: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(userID, updateUser);
  }

  /**
   * Controller to delete the given user
   * @param userID Unique user ID
   */
  @UseGuards(JWTGuard)
  @Delete()
  @HttpCode(204)
  async delete(@Body('id') userID: number) {
    if (!(await this.userService.delete(userID)))
      throw new NotFoundException(
        `User with ID ${userID} either does not exists or has already been deleted`,
      );
  }
}
