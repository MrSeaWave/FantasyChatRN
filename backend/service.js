import Koa from "koa";
import { config } from "./config/config";
const app = new Koa();

// 响应
app.use(ctx => {
  ctx.body = "Hello Koa";
});
app.listen(config.port, () => {
  console.log("succeed!!!!");
});
