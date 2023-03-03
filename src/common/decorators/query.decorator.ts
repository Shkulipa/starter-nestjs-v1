import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from 'src/common/interfaces/expressRequest.interfaces';
import { queryHelper } from 'src/common/helpers/query.helper';

export const QueryParams = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();
    const query = queryHelper(request.query);
    return query;
  },
);
