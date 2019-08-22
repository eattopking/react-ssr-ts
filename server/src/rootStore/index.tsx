import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// 服务器端获取store的方法
export const getStore = () => createStore(rootReducer, applyMiddleware(thunk));

// 浏览器端获取store的方法
export const getClientStore = () => {
  // 使用ts断言解决window报错, 数据脱水,使用客户端渲染的缓存的数据,对浏览器端渲染界面提供store的默认值
  const defaultState =  (window as any).context && (window as any).context.state;
  return createStore(rootReducer, defaultState, applyMiddleware(thunk));
};
