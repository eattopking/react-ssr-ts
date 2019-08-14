import { DIFF_ADD_ROW } from "./constants";

const defaultState = {
  rows: []
};

const diffReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DIFF_ADD_ROW:
      return { ...state, rows: action.data.rows };
    default:
      return state;
  }
};

export default diffReducer;
