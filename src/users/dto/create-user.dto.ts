import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

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
  @IsOptional()
  isEmailVerified: boolean;

  @IsInt()
  country: number;

  @IsStrongPassword()
  password: string;
}
