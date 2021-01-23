import React from "react";
import PageLayout from "../containers/Home/index";
import Login from "../containers/Login/index";
import Register from "../containers/Register/index";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

/**
 * 用于产生主页服务端渲染字符串的方法
 */
export function render({ url, context = {}, store }: { url: string; context: object; store: any }) {
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
      <link rel="stylesheet" href="/public/index.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
      </script>
      <script src="/public/index.js"></script>
    </body>
  </html>`;
}

/**
 * 用于产生登录页面服务端渲染字符串的方法
 */
export function loginRender() {
  /**
   * 使用window.context将数据缓存起来,实现数据注水,供同构的client的js代码引用
   */
  const content = renderToString(<Login />);
  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>登录界面</title>
      <link rel="stylesheet" href="login.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/public/login.js"></script>
    </body>
  </html>`;
}

/**
 * 用于产生注册页面服务端渲染字符串的方法
 */
export function registerRender() {
  /**
   * 使用window.context将数据缓存起来,实现数据注水,供同构的client的js代码引用
   */
  const content = renderToString(<Register />);
  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <title>注册界面</title>
      <link rel="stylesheet" href="register.css">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/public/register.js"></script>
    </body>
  </html>`;
}
