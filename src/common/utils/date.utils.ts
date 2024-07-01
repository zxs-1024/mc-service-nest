import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// 扩展 dayjs 功能
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// 映射预设格式
const DATE_FORMATS = {
  default: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  compact: 'YYYYMMDD',
  yearMonth: 'YYYYMM',
  year: 'YYYY',
};

/**
 * 获取时间戳
 * @param date - 要格式化的日期，可以是 Date 对象、字符串或数字
 * @param formatKey - 日期格式的键，默认为 'default'
 * @returns 格式化后的日期字符串
 */
export const getTimestamp = () => Math.floor(Date.now() / 1000);

/**
 * 格式化日期
 * @param date - 要格式化的日期，可以是 Date 对象、字符串或数字
 * @param formatKey - 日期格式的键，默认为 'default'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | string | number,
  formatKey: keyof typeof DATE_FORMATS = 'default',
): string => {
  const format = DATE_FORMATS[formatKey];
  return dayjs(date).format(format);
};

/**
 * 解析日期字符串
 * @param dateString - 要解析的日期字符串
 * @param formatKey - 日期格式的键，默认为 'default'
 * @returns 解析后的 dayjs 对象
 */
export const parseDate = (
  dateString: string,
  formatKey: keyof typeof DATE_FORMATS = 'default',
): dayjs.Dayjs => {
  const format = DATE_FORMATS[formatKey];
  return dayjs(dateString, format);
};

/**
 * 将日期转换为 UTC 格式
 * @param date - 要转换的日期，可以是 Date 对象、字符串或数字
 * @returns 转换后的 UTC 日期字符串
 */
export const toUTC = (date: Date | string | number): string => {
  return dayjs(date).utc().format();
};

/**
 * 将日期转换为指定时区格式
 * @param date - 要转换的日期，可以是 Date 对象、字符串或数字
 * @param tz - 目标时区
 * @returns 转换后的时区日期字符串
 */
export const toTimeZone = (
  date: Date | string | number,
  tz: string,
): string => {
  return dayjs(date).tz(tz).format();
};
