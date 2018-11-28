import { sprintf } from "sprintf-js";
import pgStorePool from "../utils/pgStorePool";

const tableName = "type";

export const createTypeData = sprintf(
  "CREATE TABLE IF NOT EXISTS %s ( " +
  "ID SERIAL NOT NULL PRIMARY KEY," + //主键
  "name VARCHAR(100) NOT NULL," + // 账号类型
  "option_id INTEGER default 1" + // 权限分配管理json ID, option_id:1 通用配置
    ")",
  tableName
);
export const createTypeTable = () => {
  pgStorePool.query(createTypeData);
};
