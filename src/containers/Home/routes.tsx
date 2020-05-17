import Page from "./components/page/index";
// import { simpleLoadData } from "./components/simple/simple_table";

export default [
  {
    path: "/page",
    exact: true,
    component: Page,
    key: "page"
    // 用于服务端渲染时提前获取数据填充返回的html字符串
    // loadData: simpleLoadData
  }
];
