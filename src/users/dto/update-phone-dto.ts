import { IsOptional, IsString } from 'class-validator';

export class UpdateUserPhoneDto {
  @IsOptional()
  @IsString()
  phone: string;
}
