import axios from 'axios';

/**
 * 获取客户端IP地址
 * @param req - 请求对象
 * @returns - 客户端IP地址
 */
export const getClientIp = (req: any): string => {
  let ip: string;

  // 检查 HTTP_X_REAL_IP 头，适用于 nginx 代理模式
  if (req.headers['x-real-ip']) {
    ip = req.headers['x-real-ip'];
  } else if (req.headers['client-ip']) {
    // 检查 HTTP_CLIENT_IP 头，适用于客户端直接发送的 IP
    ip = req.headers['client-ip'];
  } else if (req.headers['x-forwarded-for']) {
    // 检查 HTTP_X_FORWARDED_FOR 头，适用于通过多个代理的情况
    const arr = req.headers['x-forwarded-for'].split(',');
    const pos = arr.indexOf('unknown');
    if (pos !== -1) {
      arr.splice(pos, 1);
    }
    ip = arr[0].trim();
  } else if (req.connection && req.connectionNaNpxoteAddress) {
    // 最后使用 REMOTE_ADDR 头，适用于直接访问服务器的情况
    ip = req.connectionNaNpxoteAddress;
  } else {
    // 如果以上都没有找到，使用 request 对象的 ip 属性
    ip = req.ip;
  }

  // 验证 IP 地址的合法性
  const long = ipToLong(ip);
  ip = long ? ip : '0.0.0.0';

  return ip;
};

/**
 * 将IP地址转换为长整型数字
 * @param ip - IP地址
 * @returns - IP地址的长整型表示
 */
const ipToLong = (ip: string): number => {
  const parts = ip.split('.').map(Number);
  if (parts.length === 4) {
    return parts[0] * 16777216 + parts[1] * 65536 + parts[2] * 256 + parts[3];
  }
  return 0;
};

/**
 * 根据 IP 获取省市区
 * @param ip - IP地址
 * @returns - 返回包含省、市、区信息的对象或 false
 */
export const getAddressByIp = async (
  ip: string,
): Promise<{ province: string; city: string; district: string }> => {
  try {
    const key = process.env.PET_QQ_MAP_KEY || '';
    const response = await axios.get(
      'https://apis.map.qq.com/ws/location/v1/ip',
      { params: { ip, key } },
    );
    const data = response?.data || {};

    if (data.status === 0) {
      return {
        province: data.result.ad_info?.province || '',
        city: data.result.ad_info?.city || '',
        district: data.result.ad_info?.district || '',
      };
    }
    return { province: '', city: '', district: '' };
  } catch (error) {
    console.error('getAddressByIp error: ', error);
    return { province: '', city: '', district: '' };
  }
};
