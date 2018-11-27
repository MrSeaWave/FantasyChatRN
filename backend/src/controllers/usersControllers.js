

export const get = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    msg: "get request!!",
    data: {
      data: ctx.request.query
    }
  };
};

export const post = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    msg: "post request!!",
    data: {
      data: ctx.request.body
    }
  };
};

// 登录，与session联动
export const login = async (ctx, next) => {
  const req = ctx.request.body;
};

// 注册
export const register = async (ctx, next) => {
  const req = ctx.request.body;
};

// 更新个人信息
export const updateUserInfo = async (ctx, next) => {
  const req = ctx.request.body;
};
