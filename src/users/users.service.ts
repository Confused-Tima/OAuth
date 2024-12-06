import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto';
import { User } from 'src/entities/user.entity';
import { Country } from '../entities/country.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdateUserPhoneDto } from './dto/update-phone-dto';
import { hashPassword } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  /**
   * Fetches the user based on the given details
   * @param id Unique user ID
   * @returns Promise of User Object
   */
  async getUserByID(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Creates a new User from the given DTO
   * @param createUserdto DTO Object for user creation
   * @returns Promise which resolves to newly created user object
   */
  async create(createUserdto: CreateUserDto): Promise<User> {
    const country = await this.countryRepo.findOne({
      where: { id: createUserdto.country },
    });

    if (!country) {
      throw new BadRequestException(
        `Country with ID ${createUserdto.country} not found`,
      );
    }

    const user = this.userRepo.create({
      fname: createUserdto.fname,
      lname: createUserdto.lname,
      email: createUserdto.email,
      password: await hashPassword(createUserdto.password),
      isEmailVerified: createUserdto.isEmailVerified,
      country: country,
    });

    return await this.userRepo.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    updateUserPhone: UpdateUserPhoneDto,
  ): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['phone'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Copy the values from request to the actual user
    Object.assign(user, updateUserDto);

    if (user.phone && updateUserPhone.phone) {
      user.phone.phone = updateUserPhone.phone;
    }

    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const result = await this.userRepo.update(
      { id, isDeleted: false },
      { isDeleted: true },
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Existing user with ID ${id} not found`);
    }

    return true;
  }
}
