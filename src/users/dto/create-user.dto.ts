import { BadRequestException } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  isPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PhoneWithCountryCode', async: false })
class PhoneWithCountryCodeValidator implements ValidatorConstraintInterface {
  validate(phone: string, args: ValidationArguments) {
    const countryCode = (args.object as CreateUserDto).countryDialingCode;
    return isPhoneNumber(`${countryCode} ${phone}`);
  }

  defaultMessage() {
    return 'Phone number and country code combination is invalid!';
  }
}

export class CreateUserDto {
  @IsString()
  @Length(3)
  fname: string;

  @IsString()
  @IsOptional()
  lname: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isEmailVerified: boolean = false;

  @IsOptional()
  @IsString()
  @Validate(PhoneWithCountryCodeValidator)
  phone: string = null;

  @IsBoolean()
  isPhoneVerified: boolean = false;

  @IsString() // Added just for readability
  @IsOptional()
  countryDialingCode: string;

  @IsInt()
  @IsOptional()
  country: number;

  @IsStrongPassword()
  password: string;

  validatePhoneWithDialingCode() {
    if (!isPhoneNumber(`${this.countryDialingCode} ${this.phone}`, null)) {
      throw new BadRequestException(['Phone and Country Code is not valid']);
    }
  }
}
