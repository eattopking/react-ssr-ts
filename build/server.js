// node 环境 服务端代码webpack打包配置 生产配置

const path = require('path');
const fs = require('fs');
const baseConfig = require('./base');
const merge = require('webpack-merge');
const babelrc = require('../babelrc');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getFileList = () => {
    const fileList = fs.readdirSync(path.resolve(__dirname, '../public'));

    return fileList.reduce((result, item) => {
        const commonJsReg = /^commonchunk(\S+).js$/;
        const commonCssReg = /^commonchunk(\S+).css$/;
        const indexCssReg = /^index(\S+).css$/;
        const indexJsReg = /^index(\S+).js$/;
        const loginJsReg = /^login(\S+).js$/;
        const registerJsReg = /^register(\S+).js$/;

        if (commonJsReg.test(item)) {
            return {
                ...result,
                commonChunk: item,
            };
        }

        if (commonCssReg.test(item)) {
            return {
                ...result,
                commonCss: item,
            };
        }

        if (indexCssReg.test(item)) {
            return {
                ...result,
                indexCss: item,
            };
        }

        if (indexJsReg.test(item)) {
            return {
                ...result,
                index: item,
            };
        }

        if (loginJsReg.test(item)) {
            return {
                ...result,
                login: item,
            };
        }

        if (registerJsReg.test(item)) {
            return {
                ...result,
                register: item,
            };
        }

        return result;
    }, {});
};

const {
    index,
    commonChunk,
    commonCss,
    login,
    indexCss,
    register
} = getFileList();

module.exports = function () {
    const serverConfig = {
        // 上下文, 只作为entry和loader里面文件路径的参照
        context: path.resolve(process.cwd(), './src/server'),
        // 设置编译后的代码在node环境中运行,从而不把node引用的原生模块打包进入最后的chunk， 因为没有必要
        target: 'node',
        // 入口 这里路径就是固定以项目根路径开始
        entry: { index: './index.tsx' },
        // 出口
        output: {
            // 所要打包到的目标目录
            path: path.resolve(__dirname, '../dist'),
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
                    // 使用cache提升编译速度
                    use: [
                        {
                            loader: path.resolve(__dirname, './loader.js'),
                            options: {
                                '%index': index,
                                '%commonChunk': commonChunk,
                                '%commonCss': commonCss,
                                '%login': login,
                                '%indexCss': indexCss,
                                '%register': register,
                            },
                        },
                        {
                            loader: 'babel-loader',
                            options: babelrc({ server: true }),
                        },
                        'awesome-typescript-loader',
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.js?$/,
                    // 使用cache提升编译速度
                    use: {
                        loader: 'babel-loader',
                        options: babelrc({ server: true }),
                    },
                    exclude: /node_modules/,
                },
                // 服务端要解决， 第一次加载时候没有样式的问题，这里在我收藏里记得有解决方案，下面就是， 但是
                // 有点问题， 有时间解决， 完善一下， 在视频课里面就有这个结局方法， 不行就去看看视频
                // {
                //   test: /\.less$/,
                //   use: [
                //     "isomorphic-style-loader",
                //     "css-loader",
                //     "postcss-loader",
                //     "less-loader"
                //   ]
                // }
            ],
        },
        // 进一步设置编译后的代码在node环境中运行,从而不把node脚本引用的库编译压缩进文件
        externals: [nodeExternals()],
        plugins: [new CleanWebpackPlugin()],
        // webpack自带优化配置
        optimization: {
            // 解决模块增减 module id无法固定的问题
            moduleIds: 'hashed'
        },
    };
    return merge(baseConfig(), serverConfig);
};
