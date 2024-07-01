import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { getTimestamp } from './date.utils';

const JWT_SECRET = process.env.JWT_SECRET;
const ISS = 'petofficial';
const EXPIRATION_TIME = 60 * 60 * 24; // 24小时

/**
 * 生成用户token
 * @param params - 额外的payload参数
 * @returns 包含token和refresh_token的对象
 */
export const generateToken = (
  params: object = {},
): { token: string; refresh_token: string } => {
  const nowTime = getTimestamp();
  const jtiValue = jti();
  const payload = {
    iss: ISS,
    iat: nowTime,
    nbf: nowTime,
    exp: nowTime + EXPIRATION_TIME,
    jti: jtiValue,
    ...params,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  return {
    token,
    refresh_token: jtiValue,
  };
};

/**
 * 生成一个不会重复的字符串
 * @returns 不会重复的字符串
 */
const jti = (): string => {
  return crypto
    .createHash('sha1')
    .update(
      crypto
        .createHash('md5')
        .update(`${Date.now()}${Math.random()}`)
        .digest('hex'),
    )
    .digest('hex');
};

/**
 * 验证 JWT
 * @param seed - 加密后的用户ID
 * @param token - 需要验证的 JWT
 * @returns 解码后的 payload 或 false（如果验证失败）
 */
export const verifyToken = (seed: string, token: string): object | boolean => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }

  if (!payload.seed || payload.seed !== seed) {
    return false;
  }

  return payload;
};

/**
 * 刷新token
 * @param seed - 加密后的用户ID
 * @param token - 旧的 JWT
 * @param refresh_token - 刷新令牌
 * @returns 新的 token
 */
export const refreshToken = async (
  seed: string,
  token: string,
  refresh_token: string,
): Promise<object> => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('REFRESH_TOKEN_ERROR');
  }

  if (!payload.seed || payload.seed !== seed) {
    throw new Error('REFRESH_TOKEN_ERROR');
  }

  if (!payload.jti || payload.jti !== refresh_token) {
    throw new Error('REFRESH_TOKEN_ERROR');
  }

  const params = { seed };
  return generateToken(params);
};
