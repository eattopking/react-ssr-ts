import { combineReducers } from "redux";
import diff from "../containers/Home/components/diff/store/widgets";
import simple from "../containers/Home/components/simple/store/widgets";

export default combineReducers({ diff, simple });
