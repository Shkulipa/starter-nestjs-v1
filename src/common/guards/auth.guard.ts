import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { pick } from 'lodash';
import { ExpressRequestInterface } from 'src/common/interfaces/expressRequest.interfaces';
import { JwtService } from 'src/models/jwt/jwt.service';
import { UserService } from 'src/models/user/user.service';
import { IUserJtwData } from '../interfaces/userJwtData.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();
    const headerAuthorization = request.headers.authorization;

    const unauthorizedError = 'Not authorized';
    if (!headerAuthorization)
      throw new HttpException(unauthorizedError, HttpStatus.UNAUTHORIZED);

    const token = headerAuthorization.split(' ')[1];
    if (!token)
      throw new HttpException(unauthorizedError, HttpStatus.UNAUTHORIZED);

    try {
      const { _id } = this.jwtService.verifyAccessToken(token) as IUserJtwData;
      const user = await this.userService.findById(String(_id));

      const userData = {
        ...pick(user, ['_id', 'email', 'username', 'roles']),
      };

      request.user = userData;

      return true;
    } catch (err) {
      throw err;
    }
  }
}
