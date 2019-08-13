import simpleTable from "./components/simple_table";
import diffTable from "./components/diff_table";

export default [
  {
    path: "/",
    exact: true,
    component: simpleTable,
    key: "simple"
  },
  {
    path: "/diff",
    exact: true,
    component: diffTable,
    key: "diff"
  }
];
