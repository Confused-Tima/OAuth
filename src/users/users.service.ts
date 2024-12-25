import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { CreateUserDto } from './dto';
import { User } from 'src/entities/user.entity';
import { Country } from '../entities/country.entity';
import { UpdateUserDto } from './dto/update-user-dto';
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
   * Fetches the user based on Email
   * @param email Unique Email of a user
   * @returns Promise of User Object
   */
  async getUserByEmail(
    email: string,
    fields: FindOptionsSelect<User> = {},
  ): Promise<User> {
    return await this.userRepo.findOne({
      where: { email, isDeleted: false },
      select: fields,
    });
  }

  /**
   * Fetches the user based on unique ID
   * @param id Unique user ID
   * @returns Promise of User Object
   */
  async getUserByID(id: number, fields: (keyof User)[] = []): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id, isDeleted: false },
      select: fields,
    });
    return user ? user : null;
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

  /**
   * Updates the user with given details
   * @param id Unique User ID
   * @param updateUserDto User details to be udpated
   * @returns Updated user details
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['country'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Copy the values from request to the actual user
    Object.assign(user, updateUserDto);

    if (updateUserDto.country) {
      const country = await this.countryRepo.findOne({
        where: { id: updateUserDto.country },
      });

      if (!country)
        throw new NotFoundException(
          `Country with ID ${updateUserDto.country} not found`,
        );

      user.country = country;
    }

    return this.userRepo.save(user);
  }

  /**
   * Deletes the given user
   * @param id Unique user ID
   * @returns True if user was successfully deleted else false
   */
  async delete(id: number) {
    const result = await this.userRepo.update(
      { id, isDeleted: false },
      { isDeleted: true },
    );
    return result.affected === 0 ? false : true;
  }
}
