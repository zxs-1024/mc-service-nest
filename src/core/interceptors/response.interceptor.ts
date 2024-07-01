import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreResponse } from './core.response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CoreResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CoreResponse<T>> {
    return next.handle().pipe(map((data) => CoreResponse.success(data)));
  }
}
