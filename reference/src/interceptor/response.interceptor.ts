import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as responseFormatHelper from '@tgi/api-response-format-helper';
interface Response<T> {
    data: T
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((responseBody) => {
                return responseFormatHelper.formatResponse(null, responseBody as unknown as object);
            })
        );
    }
}
