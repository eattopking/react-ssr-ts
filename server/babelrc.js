/**
 * babel配置文件
 * 区别node 和 client 的情况,使用server判断, 服务端渲染不能用同一个.babelrc文件,当存在antd按需加载的时候
   antd 在服务端编译的时候不能设置按需加载  "import",
   {
     libraryName: "antd",
     libraryDirectory: "es",
     style: true // `style: true` 会加载 less 文件
   },
   否则会报错
   /Users/zhangheng/myPractice/reactssr/server/node_modules/antd/es/table/style/index.js:1
   import '../../style/index.less';
          ^^^^^^^^^^^^^^^^^^^^^^^^
   SyntaxError: Unexpected string
   被这个问题折磨了好几天终于解决了
   报错原因感觉是node 不识别less 和css 文件,具体还没有弄明白
 */

module.exports = ({ server }) => {
  return {
    // 这里都是对babel babel7.x的最新配置
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          modules: false
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      !server && [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true // `style: true` 会加载 less 文件
        }
      ],
      // 解决es6编译 异步函数报错问题
      "@babel/plugin-transform-runtime"
    ].filter(Boolean)
  };
};
