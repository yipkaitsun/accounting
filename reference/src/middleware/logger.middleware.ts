import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('Middleware');
  }
  use(request: Request, response: Response, next: NextFunction): void {
    const now = Date.now();
    this.logger.info(`X-Reqiest-Id: ${request.headers['x-request-id']}`);
    this.logger.info(`Original Url: ${request.originalUrl}`);
    response.on('close', () => {
      this.logger.info(`After... ${Date.now() - now}ms`);
    });
    next();
  }
}