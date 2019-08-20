import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// 服务器端获取store的方法
export const getStore = () => createStore(rootReducer, applyMiddleware(thunk));

// 浏览器端获取store的方法
export const getClientStore = () => {
  // 使用ts断言解决window报错 
  const defaultState = (window as any).context.state;
  return createStore(rootReducer, defaultState, applyMiddleware(thunk));
};
