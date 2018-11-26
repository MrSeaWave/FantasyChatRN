import { infoLog } from "../../config/debuggerConfig";

export const sessionInfo = async ctx => {
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
    infoLog("sessionINfo", ctx.session);
    // 读取session信息
    ctx.session.count = ctx.session.count + 1;
    ctx.body = ctx.session;
  } else if (ctx.url === "/destroy") {
    infoLog("destroy:session", ctx.session);
    ctx.session = null;
    ctx.body = ctx.session;
  }
};
