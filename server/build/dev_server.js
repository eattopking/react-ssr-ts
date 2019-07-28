// node 环境webpack打包配置 开发配置
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const devMode = process.env.NODE_ENV !== "production";
const path = require("path");

module.exports = function() {
  return {
    // 设置成开发模式，代码不压缩
    mode: "development",
    // 设置编译后的代码在node环境中运行,从而不把node脚本引用的库编译压缩进文件
    target: "node",
    // 入口 这里路径就是固定以项目根路径开始
    entry: { index: "./src/index.js" },
    devtool: "cheap-module-eval-source-map",
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
    resolve: {
      extensions: [".jsx", ".less", ".js", ".json", ".ts", ".tsx"],
      alias: {
        src: path.resolve(__dirname, "../src")
      }
    },
    // 进一步设置编译后的代码在node环境中运行,从而不把node脚本引用的库编译压缩进文件
    externals: [nodeExternals()],
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
};
