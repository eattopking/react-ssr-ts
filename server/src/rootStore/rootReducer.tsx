import { combineReducers } from "redux";
import diff from "../containers/Home/components/diff/store/reducer";
import simple from "../containers/Home/components/simple/store/reducer";

export default combineReducers({ diff, simple });
