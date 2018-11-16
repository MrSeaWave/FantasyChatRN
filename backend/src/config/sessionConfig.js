import PgStore from "koa-pg-session";
import { config } from "./config";

const cookie = {
  // 与 cookie 相关的配置
  maxAge: 1000 * 30, // cookie 有效时长
  httpOnly: true, // 是否只用于 http 请求中获取
  overwrite: false, // 是否允许重写
  signed: true,/** (boolean) signed or not (default true) */
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
// TODO need to modify store
const pgStore = new PgStore({
  // session 连接接postgresSql数据库
  user: config.database.username,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port
});
export const sessionConfig = {
  key: "session_chat_id", // cookie 中存储 session-id 时的键名, 默认为 koa:sess
  ...cookie,
  store: pgStore
};
