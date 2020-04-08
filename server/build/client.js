// node 环境 客户端代码 webpack打包配置 生产配置
const path = require('path');
const baseConfig = require('./base');
const merge = require('webpack-merge');
const babelrc = require('../babelrc');
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
      // 打包后的文件名
      filename: '[name].js',
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
            'happypack/loader?id=babel',
            'awesome-typescript-loader',
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
        filename: '[name].css',
        chunkFilename: '[id].css',
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
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '-',
        name: true,
        // 分割代码
        cacheGroups: {
          // 分割代码生成包的名称
          vendors: {
            // 将哪些包分割成一个模块
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          }
        }
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
    },
  };
  return merge(baseConfig(), clientConfig);
};
