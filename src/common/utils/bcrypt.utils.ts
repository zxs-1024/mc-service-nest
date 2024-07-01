import * as bcrypt from 'bcryptjs';

/**
 * 加密密码
 * @param pwd - 明文密码
 * @returns - 返回加密后的密码
 */
export const encryptPassword = async (pwd: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  return hashedPassword;
};

/**
 * 验证密码
 * @param pwd - 明文密码
 * @param hash - 加密后的密码
 * @returns - 返回验证结果，匹配返回 true，不匹配返回 false
 */
export const checkPassword = async (
  pwd: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(pwd, hash);
  return isMatch;
};
