import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';
import { Logger } from 'winston';
import { Code } from '../code';
import { CoreResponse } from '../interceptors/core.response';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  public catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorResponse: CoreResponse<unknown> = CoreResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleNestError(error, errorResponse);

    // 记录错误日志
    const { method, originalUrl, body, query, params, ip } = request;
    console.log('记录错误日志 errorResponse: ', errorResponse);
    this.logger.error(error.message, {
      req: { method, originalUrl, body, query, params, ip },
      error,
    });

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
