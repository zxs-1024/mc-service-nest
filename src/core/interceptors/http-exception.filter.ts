import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';
import { Code } from '../codes';
import { CoreResponse } from './core.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreResponse<unknown> = CoreResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleNestError(error, errorResponse);

    response.json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreResponse<unknown>,
  ): CoreResponse<unknown> {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const statusCode = Code.DB_ERROR.code;
      const message = `[${error.code}]: ${this.exceptionShortMessage(
        error.message,
      )}`;
      return CoreResponse.error(statusCode, message, null);
    }
    if (error instanceof PrismaClientValidationError) {
      const statusCode = Code.DB_ERROR.code;
      const message = Code.DB_ERROR.message;
      return CoreResponse.error(statusCode, message, null);
    }
    if (error instanceof HttpException) {
      return CoreResponse.error(error.getStatus(), error.message, null);
    }

    return errorResponse;
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
