import { DIFF_ADD_ROW } from "./constants";
const axios = require("axios");

export const addrow = () => {
  return (dispatch: any) => {
    axios.get("./addrow").then((response: { data: { row: [] } }) => {
      dispatch({
        type: DIFF_ADD_ROW,
        data: response.data.row
      });
    });
  };
};
