// 区别node 和 client 的情况

module.exports = server => {
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
