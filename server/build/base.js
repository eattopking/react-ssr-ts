// 公用配置

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          // 使用cache提升编译速度
          use: ["babel-loader?cacheDirectory=true", "awesome-typescript-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.js?$/,
          // 使用cache提升编译速度
          use: ["babel-loader?cacheDirectory=true"],
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                publicPath: "./"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  };
  return devConfig;
};
