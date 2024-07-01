import { Injectable } from '@nestjs/common';
import HashIds from 'hashids';
@Injectable()
export class HashidsService {
  private hashids: HashIds;

  constructor() {
    const MIN_HASH_LENGTH = 16;
    this.hashids = new HashIds('', MIN_HASH_LENGTH);
  }

  /**
   * 编码函数
   * @param number - 数字
   * @returns 编码后的字符串
   */
  encode(number: number): string {
    return this.hashids.encode(number);
  }

  /**
   * 解码函数
   * @param hash - 哈希字符串
   * @returns 解码后的数字数组
   */
  decode(hash: string): number[] {
    const decoded: unknown[] = this.hashids.decode(hash);
    return decoded.map((item) => Number(item));
  }
}
