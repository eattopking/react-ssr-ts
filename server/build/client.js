// node 环境 客户端代码 webpack打包配置 开发配置

const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require("./base");

module.exports = function() {
  const clientConfig = {
    // 入口 这里路径就是固定以项目根路径开始
    entry: { index: "./src/client/index.tsx" },
    // 出口
    output: {
      // 所要打包到的目标目录
      path: path.resolve(__dirname, "../public"),
      // 打包后的文件名
      filename: "[name].js",
      // 打包后，其他人引用这个包时的名称
      library: "ts",
      // 对包对外输出方式
      libraryTarget: "umd"
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  };
  return merge(baseConfig(), clientConfig);
};
