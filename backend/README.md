# backend

## step
- 复制`config/config.default.js`为`config/config.js`

## 文件结构
```
src
├── config // 默认配置文件
├── middleware // 中间件
├── routes // 路由
├── tables // 表格生成器
├── utils // 实用类函数
├── views //模版文件
└── service.js // 入口文件
```

## koa
- 参考[egg.js](https://eggjs.org/zh-cn/intro/egg-and-koa.html)
- [koa](https://github.com/demopark/koa-docs-Zh-CN)
- [koa 阮一峰](http://www.ruanyifeng.com/blog/2017/08/koa.html)

### 插件
- [nodemon](https://github.com/remy/nodemon):热更新`npm install -g nodemon`
- [log4.js](https://www.npmjs.com/package/log4js):本地输出log文件，可按照时间或者按照文件大小
- [debug](https://www.npmjs.com/package/debug):debug
- [pg](https://www.npmjs.com/package/pg):连接`PostgreSQL`数据库

koa 插件
- [koa-route](https://www.npmjs.com/package/koa-route):路由
- [koa-static](https://www.npmjs.com/package/koa-static):用来加载静态资源
- [koa-body](https://www.npmjs.com/package/koa-body):用来从 POST 请求的数据体里面提取键值对
- [koa-static-cache](https://www.npmjs.com/package/koa-static-cache):缓存文件
- ~~[koa-session-minimal](https://www.npmjs.com/package/koa-session-minimal)：处理`session`的中间件~~
- ~~[koa-pg-session](https://www.npmjs.com/package/koa-pg-session):session存放在`PostgreSQL`数据库中~~
- [koa-session](https://www.npmjs.com/package/koa-session):处理`session`的中间件
## postgresSql
```
$ pg_ctl -V
pg_ctl (PostgreSQL) 10.5
```
