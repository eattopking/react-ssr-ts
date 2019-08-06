// 用于同构client端代码
import React from "react";
import { hydrate } from "react-dom";
import PageLayout from "../containers/Home/index";
import { BrowserRouter } from "react-router-dom";
import "../containers/Home/main";

// 使用同构(共同构建)给dom元素注册事件,就是react代码,在服务端和客户端都执行一遍
hydrate(
  <BrowserRouter>
    <PageLayout />
  </BrowserRouter>,
  document.getElementById("app")
);
