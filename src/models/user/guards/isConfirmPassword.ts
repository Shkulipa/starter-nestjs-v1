import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class IsConfirmPassword implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { password, confirmPassword } = context
      .switchToHttp()
      .getRequest().body;

    if (password === confirmPassword) return true;

    throw new HttpException('Passwords is not equal', HttpStatus.BAD_REQUEST);
  }
}
