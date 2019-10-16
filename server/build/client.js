// node 环境 客户端代码 webpack打包配置 生产配置
const path = require("path");
const baseConfig = require("./base");
const merge = require("webpack-merge");
const babelrc = require("../babelrc");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function() {
  const clientConfig = {
    // 入口 这里路径就是固定以项目根路径开始
    entry: { 
      index: "./src/client/index.tsx",
      login: "./src/client/login.tsx",
      register: "./src/client/register.tsx"
   },
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
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          // 使用cache提升编译速度
          use: [
            {
              loader: "babel-loader?cacheDirectory=true",
              options: babelrc({ server: false })
            },
            "awesome-typescript-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.js?$/,
          // 使用cache提升编译速度
          use: {
            loader: "babel-loader?cacheDirectory=true",
            options: babelrc({ server: false })
          },
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            {
              loader: "less-loader",
              options: {
                // 解决这个报错 Inline JavaScript is not enabled
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  };
  return merge(baseConfig(), clientConfig);
};
