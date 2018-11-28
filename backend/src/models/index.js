import pgStorePool from "../utils/pgStorePool";
import { createUsersTable } from "./users";
import { createKpiPersonalTable } from "./kpi_personal";
import { createOptionsTable } from "./options";
import { createTypeTable } from "./type";

// 创建表
export const createAllTable = () => {
  createUsersTable();
  createKpiPersonalTable();
  createTypeTable();
  createOptionsTable();
};
