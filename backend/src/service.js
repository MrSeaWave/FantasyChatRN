import Koa from "koa";
import koaBody from "koa-body";
import { config } from "./config/config";
import logUtil from './utils/logUtil'
const app = new Koa();


const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = {
      message: err.message
    };
    ctx.app.emit("error", err, ctx);
  }
};

const main = ctx => {
  ctx.response.body ='hello world11122222';
};

// logger,放在开始
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //请求处理完毕的时刻 减去 开始处理请求的时刻 = 处理请求所花掉的时间
    let ms;
    try {
        await next();

        ms = new Date() - start;

        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;

        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});

app.use(handler);
// app.use(koaBody());
app.use(main);

app.on("error", function(err) {
  console.log("logging error ", err.message);
  console.log(err);
});

app.listen(config.port, () => {
  console.log(
    ` succeed \n please open localhost:${
      config.port
    } \n or \n http://127.0.0.1:${config.port} `
  );
});
