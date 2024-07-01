import * as crypto from 'crypto';

export class SimpleSign {
  static expireTime = 60; // 请求过期时间

  /**
   * 获取数据签名
   * @param token - 签名密钥
   * @param timestamp - 时间戳
   * @param nonce - 随机字符串
   * @returns 签名字符串
   */
  static getSign(token: string, timestamp: number, nonce: string): string {
    const signArr = [token, timestamp.toString(), nonce];
    signArr.sort();

    const signStr = signArr.join('');
    return crypto.createHash('sha1').update(signStr).digest('hex');
  }

  /**
   * 校验数据签名
   * @param signature - 接口收到的签名
   * @param timestamp - 时间戳
   * @param token - 签名密钥
   * @param nonce - 随机字符串
   * @returns true正确，false失败
   */
  static checkSign(
    signature: string,
    timestamp: number,
    token: string,
    nonce: string,
  ): boolean {
    if (Math.floor(Date.now() / 1000) > timestamp + SimpleSign.expireTime) {
      return false;
    }

    const tmpArr = [token, timestamp.toString(), nonce];
    tmpArr.sort();

    const tmpStr = tmpArr.join('');
    const tmpSign = crypto.createHash('sha1').update(tmpStr).digest('hex');

    return tmpSign === signature;
  }
}
