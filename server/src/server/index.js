// 服务端代码

import Koa from "koa";
import React from "react";
// 路径管理
import path from "path"; 
import { renderToString } from "react-dom/server";
import Table from "../containers/Home";
// 静态资源服务管理中间件
import koaStatic from "koa-static"; 

const app = new Koa();
const content = renderToString(<Table />);

// 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
// 这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
app.use(koaStatic("public"));
app.use(async ctx => {
  ctx.body = `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>ssrTable</title>
      <link rel="stylesheet" href="/index.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/index.js"></script>
    </body>
  </html>`;
});

app.listen(8000);
