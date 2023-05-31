import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
