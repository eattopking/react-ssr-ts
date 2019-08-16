import { DIFF_ADD_ROW } from "./constants";

const defaultState: { rows: [] } = {
  rows: []
};

const diff = (state = defaultState, action: { type: string; data: [] }) => {
  switch (action.type) {
    case DIFF_ADD_ROW:
      return { ...state, rows: action.data };
    default:
      return state;
  }
};

export default diff;
