import simpleTable from "./components/simple/simple_table";
import diffTable from "./components/diff/diff_table";
import { simpleLoadData } from "./components/simple/simple_table";
import { diffLoadData } from "./components/diff/diff_table";

export default [
  {
    path: "/login",
    exact: true,
    component: simpleTable,
    key: "simple",
    loadData: simpleLoadData
  },
  {
    path: "/login/diff",
    exact: true,
    component: diffTable,
    key: "diff",
    loadData: diffLoadData
  }
];
