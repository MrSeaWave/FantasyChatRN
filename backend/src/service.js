import Koa from "koa";
import session from "koa-session";
import koaBody from "koa-body";
import { config } from "./config/config";
import logger from "./middleware/logger";
import { startLog, errorLog } from "./config/debuggerConfig";
import { sessionConfig } from "./config/sessionConfig";
const app = new Koa();
const main = ctx => {
  ctx.response.body = "hello world";
  //ctx.throw(500);
};
// logger,放在最外层
app.use(logger);
// 使用session 中间键
app.use(session(sessionConfig, app));

app.use(async ctx => {
  // 设置session
  if (ctx.url === "/set") {
    ctx.session = {
      user_id: Math.random()
        .toString(36)
        .substr(2),
      count: 0
    };
    ctx.body = ctx.session;
  } else if (ctx.url === "/") {
    // 读取session信息
    ctx.session.count = ctx.session.count + 1;
    ctx.body = ctx.session;
  }
});

// app.use(koaBody());
app.use(main);

app.on("error", err => {
  errorLog(err.message);
});

app.listen(config.port, () => {
  startLog(`you open localhost:${config.port} to check`);

  console.log(
    ` succeed \n please open localhost:${
      config.port
    } \n or \n http://127.0.0.1:${config.port} `
  );
});
