import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IsConfirmPassword } from './guards/isConfirmPassword';
import { LoginUserDto } from './dto/loginUser.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger/dist/decorators';
import { ErrorDto } from 'src/common/dto/error.dto';
import { AllExceptionFilter } from 'src/exception/allExceptionFilter';

@UseFilters(new AllExceptionFilter())
@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'User success created.',
  })
  @ApiBadRequestResponse({
    description: 'Validation Failure.',
    type: ErrorDto,
  })
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  @UseGuards(IsConfirmPassword)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @ApiCreatedResponse({
    description: 'Success login.',
  })
  @ApiBadRequestResponse({
    description: 'Validation Failure.',
    type: ErrorDto,
  })
  @Post('/signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() loginUserDto: LoginUserDto) {
    const userData = await this.userService.signin(loginUserDto);
    return userData;
  }

  @Get('/activate/:activationId')
  async activate(@Param('activationId') activationId: string) {
    const result = await this.userService.activate(activationId);
    return result;
  }
}
