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
        const loginCssReg = /^login(\S+).css$/;
        const registerCssReg = /^register(\S+).css$/;
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

        if (loginCssReg.test(item)) {
            return {
                ...result,
                loginCss: item,
            };
        }

        if (registerCssReg.test(item)) {
            return {
                ...result,
                registerCss: item,
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
    register,
    loginCss,
    registerCss
} = getFileList();

// 在node环境中运行的JavaScript代码需要注意：
// 1. 不能包含浏览器环境提供的API
// 2. 不能包含css代码，因为服务端渲染的目的是渲染html内容， 渲染出css代码会增加额外的计算量，影响服务端渲染
// 3. 不能像用于浏览器环境的输出代码那样把node_modules里的第三方模块和nodejs原生模块打包进去，而是需要通过commonjs规范去引入这些模块
// 4. 需要通过commonjs规范导出一个渲染函数，以用于在HTTP服务器中执行这个渲染函数，渲染出HTML内容返回


module.exports = function () {
    const serverConfig = {
        // 上下文, 只作为entry和loader里面文件路径的参照
        context: path.resolve(process.cwd(), './src/server'),
        // 设置编译后的代码在node环境中运行, 从而不把node引用的原生模块打包进入最后的chunk， 因为没有必要， 也会让打包后的模块化都是commonjs 模块化， node原始支持的
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
                                '%indexJs': index,
                                '%commonChunk': commonChunk,
                                '%commonCss': commonCss,
                                '%login': login,
                                '%indexCss': indexCss,
                                '%register': register,
                                '%cssLogin': loginCss,
                                '%cssRegister': registerCss,
                            },
                        },
                        {
                            loader: 'babel-loader',
                            options: babelrc({ server: true }),
                        },
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
                // 这样只会给元素加上类名， 在node构建的时候可以解析less文件，不会打包出css文件
                {
                    test: /\.less$/,
                    use: [
                        "isomorphic-style-loader",
                        "css-loader",
                        "postcss-loader",
                        "less-loader"
                    ]
                }
            ],
        },
        /**
         * 不把node代码中引用node_modules中的模块打包进最后的模块中，因为node环境默认值支持commonjs模块化了
         * 构建后的代码都是符合commonjs规范模块化的，所有在node执行时， 直接引用node_modules中的
         * 模块就可以直接使用， 所以不需要将引用的node_modules包中模块打包进输出文件
         */
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
