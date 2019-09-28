import simpleTable from "./components/simple/simple_table";
import diffTable from "./components/diff/diff_table";
// import { simpleLoadData } from "./components/simple/simple_table";
// import { diffLoadData } from "./components/diff/diff_table";

export default [
  {
    path: "/login",
    exact: true,
    component: simpleTable,
    key: "simple",
    // 用于服务端渲染时提前获取数据填充返回的html字符串
    // loadData: simpleLoadData
  },
  {
    path: "/login/diff",
    exact: true,
    component: diffTable,
    key: "diff",
    // 用于服务端渲染时提前获取数据填充返回的html字符串
    // loadData: diffLoadData
  }
];
