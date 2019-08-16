import { SIMPLE_ADD_ROW } from "./constants";

export const addrow = () => {
  return (dispatch: any) => {
    dispatch({
      type: SIMPLE_ADD_ROW,
      data: []
    });
  };
};
