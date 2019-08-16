import { combineReducers } from "redux";
import diffReducer from "../containers/Home/components/diff/store";
import simpleReducer from "../containers/Home/components/simple/store";

export default combineReducers({ diffReducer, simpleReducer });
