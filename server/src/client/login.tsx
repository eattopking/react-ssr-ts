// 用于同构的登录页client端代码

import React from "react";
import { hydrate } from "react-dom";
import Login from "../containers/Login/index";

// 使用同构(共同构建)给dom元素注册事件,就是react代码,在服务端和客户端都执行一遍
hydrate(
  <Login />,
  document.getElementById("app")
);
