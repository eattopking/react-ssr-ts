import React from "react";
import Table from "../containers/Home";
import { hydrate } from "react-dom";

hydrate(<Table />, document.getElementById("app"));
