// 公用配置
const path = require("path");

module.exports = function() {
  const devConfig = {
    // 设置成生产模式，代码压缩
    mode: "production",
    devtool: "source-map",
    resolve: {
      extensions: [".tsx", ".less", ".js"],
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
                // 超过8192b, 就替换为file-loader处理
                limit: 8192,
                // 名称+hash命名, name可以设置生成路径也可以设置文件名称
                name: '[name][hash].[ext]'
              }
            }
          ]
        }
      ]
    }
  };
  return devConfig;
};
