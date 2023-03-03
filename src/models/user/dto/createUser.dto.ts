import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  readonly confirmPassword: string;
}
