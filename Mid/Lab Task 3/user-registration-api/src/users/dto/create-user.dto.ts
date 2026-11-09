import {
  IsString, IsNotEmpty, MinLength, IsEmail, IsInt,
  Min, Max, Matches, IsIn, IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message:
      'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  })
  password: string;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  @IsString()
  @Matches(/^01\d{9}$/, {
    message: 'Phone must be exactly 11 digits and start with 01',
  })
  phone: string;

  @IsIn(['student', 'teacher'])
  accountType: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  address?: string;
}