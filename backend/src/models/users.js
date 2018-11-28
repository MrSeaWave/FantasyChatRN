import { sprintf } from "sprintf-js";
import pgStorePool from "../utils/pgStorePool";

const tableName = "users";
export const createUsersType = sprintf(
  "CREATE TABLE IF NOT EXISTS %s ( " +
  "ID SERIAL NOT NULL PRIMARY KEY," + //主键
  "uid VARCHAR(100) UNIQUE NOT NULL," + // 由uuid.v1生成,用户唯一标示码
  "account VARCHAR(100) NOT NULL," + // 账号名
  "password VARCHAR(100) NOT NULL," + // 密码
  "type_id INTEGER default 1," + // 权限管理 ，0:'admin',1:'guest'
  "is_visible BOOLEAN default TRUE" + // 账号是否有效
    ")",
  tableName
);
// 增加数据类型
export const addUsersDataType = sprintf(
  "ALTER TABLE %s \n" +
  "ADD COLUMN IF NOT EXISTS phone VARCHAR(100)," + // 手机号
  "ADD COLUMN IF NOT EXISTS iso VARCHAR(2) ," + // 国家编码，ISO 3166-1，二位代码
  "ADD COLUMN IF NOT EXISTS email VARCHAR(100) ," + // 邮箱
  "ADD COLUMN IF NOT EXISTS birthday DATE ," + // 生日，见下文
  "ADD COLUMN IF NOT EXISTS avatar TEXT," + // 头像
    "ADD COLUMN IF NOT EXISTS test_field VARCHAR(100) NOT NULL", // 测试字段，见下文
  tableName
);

// 修改数据类型
export const modifyUsersDataType = sprintf(
  "ALTER TABLE %s \n" +
  "ALTER COLUMN test_field TYPE VARCHAR(10)," + // 改变测试字段类型，取消非空设定
    "ALTER COLUMN test_field DROP NOT NULL",
  tableName
);

export const createUsersTable = () => {
  pgStorePool.query(createUsersType).then(() => {
    pgStorePool.query(addUsersDataType).then(() => {
      pgStorePool.query(modifyUsersDataType);
    });
  });
};
