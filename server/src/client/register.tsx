// 用于同构的注册页client端代码

import React from "react";
import { hydrate } from "react-dom";
import Register from "../containers/Register/index";

// 使用同构(共同构建)给dom元素注册事件,就是react代码,在服务端和客户端都执行一遍
hydrate(
  <Register />,
  document.getElementById("app")
);