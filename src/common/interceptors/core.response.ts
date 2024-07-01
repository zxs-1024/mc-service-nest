import { Nullable } from '@common/types/common';
import { Code } from '../code';

export class CoreResponse<TData> {
  readonly code: number;
  readonly message: string;
  readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }

  static success<TData>(data?: TData, message?: string): CoreResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreResponse(resultCode, resultMessage, data);
  }

  static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): CoreResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreResponse(resultCode, resultMessage, data);
  }
}
