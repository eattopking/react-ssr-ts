import { SIMPLE_ADD_ROW } from "./constants";

const defaultState: { rows: [] } = {
  rows: []
};

export const simpleReducer = (state = defaultState, action: { type: string; data: { rows: [] } }) => {
  switch (action.type) {
    case SIMPLE_ADD_ROW:
      return { ...state, rows: action.data.rows };
    default:
      return state;
  }
};
