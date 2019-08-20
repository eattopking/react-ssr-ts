import { DIFF_ADD_ROW } from "./constants";
const axios = require("axios");

export const addrow = () => {
  return (dispatch: any) => {
    return axios.get("./addrow").then((response: { data: { rows: [] } }) => {
      dispatch({
        type: DIFF_ADD_ROW,
        data: response.data.rows
      });
    });
  };
};
