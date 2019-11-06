import simpleTable from "./components/simple/simple_table";
// import { simpleLoadData } from "./components/simple/simple_table";

export default [
  {
    path: "/page",
    exact: true,
    component: simpleTable,
    key: "simple"
    // 用于服务端渲染时提前获取数据填充返回的html字符串
    // loadData: simpleLoadData
  }
];
