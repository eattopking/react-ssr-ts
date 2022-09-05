// node 环境 客户端代码 webpack打包配置 生产配置
const path = require('path');
const baseConfig = require('./base');
const webpackMerge = require('webpack-merge');
const babelrc = require('../babelrc');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function () {
  const clientConfig = {
    // 上下文, 只作为entry和loader里面文件路径的参照
    context: path.resolve(process.cwd(), './src/client'),
    // 入口 这里路径就是固定以项目根路径开始
    entry: {
      index: './index.tsx',
      login: './login.tsx',
      register: './register.tsx',
    },
    // 出口
    output: {
      // 所要打包到的目标目录
      path: path.resolve(__dirname, '../public'),
      // filename: '[name].js',
      // 打包后的文件名 chunkhash减少文件名变化, 提升前端性能, 减少请求
      filename: '[name].[chunkhash:8].js',
      // 打包后，其他人引用这个包时的名称
      library: 'ts',
      // 对包对外输出方式
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelrc({ server: false }),
            },
            // 耗时的 loader （例如 babel-loader）,多线程构建， 最新的多进程处理loader工作的的loader
            'thread-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                // 解决这个报错 Inline JavaScript is not enabled
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // 最新的提取css文件的plugin
      new MiniCssExtractPlugin({
        // 减少文件名变化, 使强缓存协商缓存还有效, chunkhash 提升前端性能, 减少请求
        filename: '[name].[contenthash:8].css',
        // 决定了非入口中引用的css文件的名称
        // chunkFilename: '[name].[contenthash].css'
      }),
    ],
    // webpack自带优化配置
    optimization: {
      splitChunks: {
        // 不管同步还是异步都提取公共模块
        chunks: 'all',
        // 提取公共模块的最小大小
        minSize: 30000,
        maxSize: 0,
        // 模块被import引用几次,才提取成公共模块
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '-',
        // name: true,
        // 缓存组, 组名+共同引用的各个入口名组成, 分割成的代码块名
        cacheGroups: {
          // 缓存组名称
          // 这里配置提取公共代码，默认css公共代码也会被提出来， 命名也是commonchunk， 当时文件名是按照MiniCssExtractPlugin 的filename命名规则来的
          common: {
            // 提取公共代码的文件范围
            test: /[\\/]node_modules[\\/]/,
            minChunks: 3,
            // 优先级
            priority: -10,
            name: 'commonchunk',
            filename: '[name].[chunkhash:8].js',
          },
          vendors: false,
          default: false,
        },
      },
      // 使用自定义TerserPlugin插件对原有TerserPlugin插件进行替换
      minimizer: [
        // 最新的压缩js的plugin，可以多进程压缩
        new TerserPlugin({
          // 缓存文件
          cache: true,
          // 使用多线程构建
          parallel: true,
          sourceMap: true,
        }),
        // 最新压缩css和设置css source-map的plugin
        new CssMinimizerPlugin(),
      ],
    },
  };
  return webpackMerge.merge(baseConfig(), clientConfig);
};
