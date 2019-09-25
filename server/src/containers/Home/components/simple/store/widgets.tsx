/**
 * 这里使用redux的ducks模式将reducer和actions还有常量放到一起,避免了,多个
 * 文件自改起来的麻烦,和繁琐
 */

/**
 * 常量
 * 增行
 */
const SIMPLE_ADD_ROW = "SIMPLE/SIMPLE_ADD_ROW";

/**
 * reducer
 * 这个模式下reducer 使用export default 唯一暴露
 */
const defaultState: { rows: [] } = {
  rows: []
};

export default (state = defaultState, action: { type: string; data: [] }) => {
  switch (action.type) {
    case SIMPLE_ADD_ROW:
      return { ...state, rows: action.data };
    default:
      return state;
  }
};


/**
 * actions
 * 这个模式下actions 使用export 暴露多个action
 */
const axios = require("axios");

export const addrow = () => {
  return (dispatch: any) => {
    return axios.get("/addrow").then((response: { data: { rows: [] } }) => {
      dispatch({
        type: SIMPLE_ADD_ROW,
        data: response.data.rows
      });
    });
  };
};

