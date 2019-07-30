import Koa from "koa";
import React from "react";
import { renderToString } from "react-dom/server";
import Table from "../containers/Home";
import Static from "koa-static"; // 静态资源服务管理中间件
import path from "path"; // 路径管理
const app = new Koa();
const content = renderToString(<Table />);


// 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回
app.use(Static(path.resolve(__dirname, "../public")));
app.use(async ctx => {
  ctx.body = `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>ssrTable</title>
      <link rel="stylesheet" href="">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/index.js"></script>
    </body>
  </html>`;
});

app.listen(8000);
