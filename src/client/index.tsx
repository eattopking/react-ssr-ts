// 用于同构client端代码
import React from "react";
import { hydrate } from "react-dom";
import PageLayout from "../containers/Home/index";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "../rootStore";
import "../containers/Home/main";

// 针对client特殊设置获取store的方法,在这个方法里进行了数据脱水
const store = getClientStore();

// 使用同构(共同构建)给dom元素注册事件,就是react代码,在服务端和客户端都执行一遍
// 这里就是在构建时将jsx转为createElement，然后将react等打包进最后的chunk，然后将处理完参数的hydrate函数调用
// 也是打包进最后的chunk中， 然后这个chunk中的代码在浏览器中最后执行

/**
 * hydrate api引用到就可以直接用了， webpack不会对它在进行什么转化，什么处理了
 * webpack构建就是把这里当成最后的执行， 然后将其他相关的代码和这个函数调用都构建到一个chunk中， 这个就是webpack
 * 构建前端代码的最后用意
 */
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
