import React from "react";
import Layout from "./containers/Home/index";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

export default function render({ url, context = {} }: { url: string; context: object }) {
  const content = renderToString(
    // 作用应该是每次后台初次返回页面时决定,初次显示那个路径下的页面
    <StaticRouter location={url} context={context}>
      <Layout />
    </StaticRouter>
  );
  return `<!DOCTYPE html>
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
}
