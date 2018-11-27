import { sprintf } from "sprintf-js";

export const createUsers = sprintf(
  "CREATE TABLE IF NOT EXISTS %s ( " +
    "ID  SERIAL NOT NULL PRIMARY KEY," +
    "name VARCHAR(100) NOT NULL," +
    "password VARCHAR(100) NOT NULL" +
    ")",'users'
);
