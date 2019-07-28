import Koa from "koa";
import React from "react";
import { renderToString } from "react-dom/server";
// import Table from "./containers/Home";
const app = new Koa();

// const content = renderToString(<Table />);

app.use(async ctx => {
  ctx.body = `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>ssrTable</title>
    </head>
    <body>
      <div id="app" class="app">
        ${333333}
      </div>
    </body>
  </html>`;
});

app.listen(8000);
