import React from "react";
import Table from "../containers/Home";
import { hydrate } from "react-dom";
import "../containers/Home/main";
// 使用同构(共同构建)给dom元素注册事件,就是react代码,在服务端和客户端都执行一遍
hydrate(<Table />, document.getElementById("app"));
