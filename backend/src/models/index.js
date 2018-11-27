console.log('index.js')
import pgStorePool from "../utils/connectPgStoreUtils";
import { createUsers } from "./users";
import { createKpiPersoanl } from "./kpi_personal";

// 创建表
export const createAllTable = () => {
  pgStorePool.query(createUsers);
  pgStorePool.query(createKpiPersoanl);
};
