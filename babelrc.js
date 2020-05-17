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
        '@babel/preset-env',
        {
          /**
           * useBuiltIns 设置 babel-polyfill插件的参数,
           * babel-polyfill就是对babel无法转换的部分的补充(代码填充)
           * babel-polyfill适合用在业务性前端项目中, babel-polyfill转换后生成全局变量
           *  参数值 为usage 表示按需加载, 根据真实使用和浏览器兼容配置决定转换代码量
           */

          useBuiltIns: 'usage',
          modules: false
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      !server && [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true // `style: true` 会加载 less 文件
        }
      ],
      /*
       *plugin-transform-runtime就是对babel无法转换的部分的补充(代码填充)
       *这里插件不会造成全局变量污染, 并且可以提取公共代码,
       *放到babel-runtime的helpers文件中,让使用者用垫片(shiming)的形式引入,
       *plugin-transform-runtime也是按需加载的, 根据是实际使用和浏览器兼容配置, 决定生成的代码量,
       *但是无法转换一些原生实例api, 比如string.includes, Object.assign,
       *所以在业务项目中不使用它, 只有在第三方库中使用, 不支持的api依赖于引用者的全局polyfill,
       */
      // '@babel/plugin-transform-runtime'
    ].filter(Boolean)
  };
};
