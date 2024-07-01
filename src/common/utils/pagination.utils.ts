/**
 * 格式化分页数据
 * @param param0 - 分页数据对象
 * @param param0.count - 总记录数
 * @param param0.page - 当前页码
 * @param param0.limit - 每页记录数
 * @returns 格式化后的分页数据对象
 */
export const formatPagination = ({
  count,
  page,
  limit,
}: {
  count: number;
  page: number;
  limit: number;
}) => {
  const pages = Math.ceil(count / limit); // 总页数
  return {
    totalCount: count,
    currentPage: parseInt(page.toString(), 10),
    currentPageSize: limit,
    totalPage: pages,
  };
};
