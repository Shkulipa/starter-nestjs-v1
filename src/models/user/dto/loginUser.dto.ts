import { UseFilters } from '@nestjs/common';
import { IsNotEmpty, MinLength } from 'class-validator';
import { AllExceptionFilter } from 'src/exception/allExceptionFilter';

@UseFilters(new AllExceptionFilter())
export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
