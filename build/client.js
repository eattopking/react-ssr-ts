// node 环境 客户端代码 webpack打包配置 生产配置
const path = require('path');
const baseConfig = require('./base');
const merge = require('webpack-merge');
const babelrc = require('../babelrc');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HappyPack = require('happypack');

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
            // 使用cache提升编译速度
            'cache-loader',
            'happypack/loader?id=babel'
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=style'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        // 减少文件名变化, 使强缓存协商缓存还有效, chunkhash 提升前端性能, 减少请求
        filename: '[name].[contenthash:8].css',
        // 决定了非入口中引用的css文件的名称
        // chunkFilename: '[name].[contenthash].css'
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            // 不生成内联映射,这样配置就会生成一个source-map文件
            inline: false,
            // 向css文件添加source-map路径注释
            // 如果没有此项压缩后的css会去除source-map路径注释
            annotation: true,
          },
        },
      }),
      // 使用模块相对路径的hash前四位作为moduleid, 避免多语的moduleid改变, 使文件内容不变时, chunkhash不变
      // new webpack.HashedModuleIdsPlugin(),
      // 多线程构建js
      new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件的loader配置，用法和 Loader 配置中一样
        loaders: [
          // 处理js的loader, 这里面只能放'babel-loader', 其他的还是在loader里面配置
          {
            loader: 'babel-loader',
            options: babelrc({ server: false }),
          },
        ],
      }),
      // 多线程构建css
      new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'style',
        // 如何处理 .css 文件的loader配置，用法和 Loader 配置中一样
        loaders: [
          // 处理css的loader, MiniCssExtractPlugin.loader不能放在这里, 需要放在loader中
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
            filename: '[name].[chunkhash:8].js'
          },
          vendors: false,
          default: false,
        },
      },
      // 使用自定义TerserPlugin插件对原有TerserPlugin插件进行替换
      minimizer: [
        new TerserPlugin({
          // 缓存文件
          cache: true,
          // 使用多线程构建
          parallel: true,
          sourceMap: true,
        }),
      ],
      // 解决模块增减 module id无法固定的问题
      moduleIds: 'hashed'
    },
  };
  return merge(baseConfig(), clientConfig);
};
