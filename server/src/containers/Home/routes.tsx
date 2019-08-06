import React from "react";
import { Route } from "react-router-dom";
import simpleTable from "./components/simple_table";
import diffTable from "./components/diff_table";

export default function Routes() {
  return (
    <>
      <Route exact path="/" component={simpleTable} />
      <Route path="/difficult" component={diffTable} />
    </>
  );
}
