// node 环境 服务端代码webpack打包配置 开发配置

const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./base");

module.exports = function() {
  const serverConfig = {
    // 设置编译后的代码在node环境中运行,从而不把node脚本引用的库编译压缩进文件
    target: "node",
    // 入口 这里路径就是固定以项目根路径开始
    entry: { index: "./src/server/index.js" },
    // 出口
    output: {
      // 所要打包到的目标目录
      path: path.resolve(__dirname, "../dist"),
      // 打包后的文件名
      filename: "[name].js",
      // 打包后，其他人引用这个包时的名称
      library: "ts",
      // 对包对外输出方式
      libraryTarget: "umd"
    },
    // 进一步设置编译后的代码在node环境中运行,从而不把node脚本引用的库编译压缩进文件
    externals: [nodeExternals()]
  };
  return merge(baseConfig(), serverConfig);
};
