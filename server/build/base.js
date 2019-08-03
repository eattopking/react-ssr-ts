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
    }
  };
  return devConfig;
};
