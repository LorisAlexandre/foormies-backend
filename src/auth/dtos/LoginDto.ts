import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  // @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  password: string;
}
