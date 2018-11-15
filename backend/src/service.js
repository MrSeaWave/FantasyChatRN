import Koa from "koa";
import koaBody from "koa-body";
import { config } from "./config/config";
import logger from "./middleware/logger";
import { startLog, errorLog } from "./config/debuggerConfig";
const app = new Koa();
const main = ctx => {
  ctx.response.body = "hello world";
  //ctx.throw(500);
};
// logger,放在最外层
app.use(logger);

// app.use(koaBody());
app.use(main);

app.on("error", function(err) {
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
