import { sprintf } from "sprintf-js";
import pgStorePool from "../utils/pgStorePool";

const tableName = "options";

export const createOptionsData = sprintf(
  "CREATE TABLE IF NOT EXISTS %s ( " +
  "ID SERIAL NOT NULL PRIMARY KEY," + //主键
  "option_data json NOT NULL" + // 权限json
    ")",
  tableName
);
export const createOptionsTable = () => {
  pgStorePool.query(createOptionsData);
};
