import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@tgi/api-common-class';

@Injectable()
export class AppRequestHeaderValidatorMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.headers['x-request-id'] as string;
    if (!requestId) {
      throw new ApiError('X-Request-Id request header is required');
    }
    next();
  }
}