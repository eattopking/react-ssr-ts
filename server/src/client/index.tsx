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
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
