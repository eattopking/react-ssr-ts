import React from "react";
import PageLayout from "./containers/Home/index";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

// 用于产生服务端渲染字符串的方法
export default function render({ url, context = {}, store }: { url: string; context: object; store: any }) {
  /**
   * location={url}作用应该是每次后台初次返回页面时决定,初次显示那个路径下的页面
   * 使用window.context将数据缓存起来,实现数据注水,供同构的client的js代码引用
   */
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <PageLayout />
      </StaticRouter>
    </Provider>
  );
  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>ssrTable</title>
      <link rel="stylesheet" href="/index.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
      </script>
      <script src="/index.js"></script>
    </body>
  </html>`;
}
