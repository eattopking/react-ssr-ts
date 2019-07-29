// 公用配置

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const path = require("path");

module.exports = function() {
  const devConfig = {
    // 设置成开发模式，代码不压缩
    mode: "development",
    devtool: "cheap-module-eval-source-map",
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
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
            },
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
            },
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      })
    ]
  };
  return devConfig;
};
