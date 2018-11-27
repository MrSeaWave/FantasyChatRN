import { Pool } from "pg";
import { config } from "../config/config";

let instance = null;

class pgStorePool {
  static getInstance() {
    if (!instance) {
      instance = new pgStorePool();
    }
    return instance;
  }
  constructor() {
    const connection = {
      user: config.database.username,
      host: config.database.host,
      database: config.database.database,
      password: config.database.password,
      port: config.database.port
    };
    this.pool = new Pool(connection);
  }

  query(query, params) {
    return this.pool.query(query, params);
  }
}
export default pgStorePool.getInstance();
