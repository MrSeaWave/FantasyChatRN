import { sprintf } from "sprintf-js";
import pgStorePool from "../utils/pgStorePool";

const tableName = "kpi_personal";
export const createKpiPersonalDataType = sprintf(
  "CREATE TABLE IF NOT EXISTS %s ( " +
    "ID  SERIAL NOT NULL PRIMARY KEY," +
    "name VARCHAR(100) NOT NULL," +
    "password VARCHAR(100) NOT NULL" +
    ")",
  tableName
);

export const createKpiPersonalTable = () => {
  pgStorePool.query(createKpiPersonalDataType);
};
