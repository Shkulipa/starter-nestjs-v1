import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
