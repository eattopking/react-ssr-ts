// 服务端代码

import Koa from "koa";
// 路径管理
import path from "path";
import Router from "koa-router";
// 静态资源服务管理中间件
import koaStatic from "koa-static";
import render from "../utils";

// 创建koa实例
const app = new Koa();
// 创建koa路由实例
const router = new Router();

// 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
// 这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
app.use(koaStatic("public"));
router.get("*", (ctx) => {
  ctx.body = render({url: ctx.request.url});
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(8000);
