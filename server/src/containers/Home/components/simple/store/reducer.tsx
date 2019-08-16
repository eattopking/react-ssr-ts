import { SIMPLE_ADD_ROW } from "./constants";

const defaultState: { rows: [] } = {
  rows: []
};

const simple = (state = defaultState, action: { type: string; data: [] }) => {
  switch (action.type) {
    case SIMPLE_ADD_ROW:
      return { ...state, rows: action.data };
    default:
      return state;
  }
};

export default simple;
