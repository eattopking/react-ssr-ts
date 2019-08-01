// 公用配置

const webpack = require("webpack");
const path = require("path");

module.exports = function() {
  const devConfig = {
    // 设置成开发模式，代码不压缩
    mode: "production",
    devtool: "source-map",
    resolve: {
      extensions: [".jsx", ".less", ".js", ".json", ".ts", ".tsx"],
      alias: {
        src: path.resolve(__dirname, "../src")
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "awesome-typescript-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.js?$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        }
      ]
    }
  };
  return devConfig;
};
