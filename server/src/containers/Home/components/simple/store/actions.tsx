import { SIMPLE_ADD_ROW } from "./constants";
const axios = require("axios");

export const addrow = () => {
  return (dispatch: any) => {
    return axios.get("http://localhost:8000/addrow").then((response: { data: { rows: [] } }) => {
      dispatch({
        type: SIMPLE_ADD_ROW,
        data: response.data.rows
      });
    });
  };
};
