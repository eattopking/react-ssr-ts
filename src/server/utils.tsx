import React from "react";
import PageLayout from "../containers/Home/index";
import Login from "../containers/Login/index";
import Register from "../containers/Register/index";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

/**
 * 用于产生主页服务端渲染字符串的方法
 * 通过babel 和target： node 将node中执行的代码es6模块化转化为commonjs模块化
 */
export function render({ url, context = {}, store }: { url: string; context: object; store: any }) {
  /**
   * 1.jsx语法会在构建的时候被babel转化称为createElement的形式，构建的时候不会将
   * react、react-dom等包打包进去, 而是在接口请求执行到这里的时候， 直接commonjs
   * 引用node_modules中的包使用， 因为node环境可以直接引，包也是引了可以直接用的，所有
   * 不用像构建前端代码一样react等第三方包都构建进去， 前端构建将react等构建进去， 是因为浏览器不支持模块化，不能引用node_modules中的包
   * 不构建进去就不能使用这个包了
   * 2. location={url}作用应该是每次后台初次返回页面时决定,初次显示那个路径下的页面
   * 3. 使用window.context将数据缓存起来,实现数据注水,供同构的client的js代码引用
   *
   * 在服务端用于服务端渲染，变成字符串的react组件也是可以使用redux的，和前端使用redux一样，就是服务端redux数据
   * 直接就解析到renderToString返回的标签字符串中去了
   *
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
      <title>回忆墙</title>
      <link rel="stylesheet" href="/public/%commonCss">
      <link rel="stylesheet" href="/public/%indexCss">
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
      </script>
      <script src="/public/%commonChunk"></script>
      <script src="/public/%indexJs"></script>
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
      <title>回忆墙登录</title>
      <link rel="stylesheet" href="/public/%commonCss">
      <link rel="stylesheet" href="/public/%cssLogin">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/public/%commonChunk"></script>
      <script src="/public/%login"></script>
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
      <title>回忆墙注册</title>
      <link rel="stylesheet" href="/public/%commonCss">
      <link rel="stylesheet" href="/public/%cssRegister">
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/public/%commonChunk"></script>
      <script src="/public/%register"></script>
    </body>
  </html>`;
}
