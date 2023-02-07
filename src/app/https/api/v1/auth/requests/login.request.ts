import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
