import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  get() {}

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return createUser;
  }

  @Patch()
  edit() {}

  @Delete()
  delete() {}
}
