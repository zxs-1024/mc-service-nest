/**
 * 查询未逻辑删除数据（通用表字段处理）
 * 查询时需过滤 is_deleted 为 1 的数据
 * is_deleted 是否已经逻辑删除 0:未删除(初始值) 1:已删除
 */
export const whereIsPreserved = {
  is_deleted: 0,
};

// 查询逻辑删除数据
export const whereIsDeleted = {
  is_deleted: 1,
};
