import Koa from "koa";
import session from "koa-session";
import koaBody from "koa-body";
import { config } from "./config/config";
import logger from "./middleware/logger";
import { startLog, errorLog, infoLog } from "./config/debuggerConfig";
import { sessionConfig } from "./config/sessionConfig";
import { sessionInfo } from "./demo/sessionInfo/sessionMIddleware";

import userRouter from "./routes/userRouter";
import { createAllTable } from "./models";

createAllTable();
const app = new Koa();
app.keys = ["fantasy_chat_app_keys"];

// 使用logger中间键,放在最外层
app.use(logger);

// 使用session 中间键
app.use(session(sessionConfig, app));

// demo路由：修改，获取session
// app.use(sessionInfo);

// 后端监听路由
app.use(koaBody());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

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
