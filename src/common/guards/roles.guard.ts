import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EVariables } from '../constants/namesVariables';
import { ExpressRequestInterface } from 'src/common/interfaces/expressRequest.interfaces';
import { EUserRoles } from 'src/common/interfaces/userRoles.interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roleForAccess = this.reflector.get<EUserRoles>(
      EVariables.ROLE,
      context.getHandler(),
    );

    if (!roleForAccess) {
      return true;
    }

    const { user } = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    /**
     * @info
     * if you need that all needing roles should also be in a user, see it:
     * https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array
     */
    const isAccess = user.roles.includes(roleForAccess);

    if (!isAccess)
      throw new HttpException(
        "Forbidden, haven't access",
        HttpStatus.FORBIDDEN,
      );

    return true;
  }
}
