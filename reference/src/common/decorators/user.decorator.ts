import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestUser } from '../interfaces/request-user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    return {
      id: userId ? Number(userId) : null,
    };
  },
);