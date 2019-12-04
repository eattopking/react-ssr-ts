// 公用配置
const path = require("path");

module.exports = function() {
  const devConfig = {
    // 设置成生产模式，代码压缩
    mode: "production",
    // devtool: "source-map",
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
