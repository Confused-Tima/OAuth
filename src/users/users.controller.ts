import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserPhoneDto } from './dto/update-phone-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Fetches user details based on it's unique ID
   * @param userID Unique user ID
   * @returns Promise of a unqiue user
   */
  @Get()
  async get(@Query('id') userID: number): Promise<User> {
    return await this.userService.getUserByID(userID);
  }

  /**
   * Creates a user out of given details
   * @param createUser User details in format of CreateUserDto
   * @returns Promise of created user
   */
  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.create(createUser);
  }

  /**
   * Updates the user with given details
   * @param userID Unique user ID
   * @param updateUser Update user details
   * @param updateUserPhone Update user Phone
   * @returns Updated user details
   */
  @Patch()
  async update(
    @Body('id') userID: number,
    @Body() updateUser: UpdateUserDto,
    @Body() updateUserPhone: UpdateUserPhoneDto,
  ): Promise<User> {
    return await this.userService.update(userID, updateUser, updateUserPhone);
  }

  /**
   * Deletes the user
   * @param userID Unique user ID
   */
  @Delete()
  @HttpCode(204)
  async delete(@Body('id') userID: number) {
    await this.userService.delete(userID);
  }
}
