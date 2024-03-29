// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
// jest 基础配置
module.exports = {
  // 以哪个目录为起点向下搜索测试文件执行
  // "roots": [
  //   "<rootDir>"
  // ],

  "collectCoverageFrom": [
    // 测试的时候需要测试src目录下的js,jsx,ts,tsx文件
    "src/**/*.{js,jsx,ts,tsx}",
    // 不测试.d.ts文件
    "!src/**/*.d.ts"
  ],
  // 使用polyfill对jsdom进行补偿， 解决兼容问题
  "setupFiles": [
  ],
  // 我们执行测试文件之前， 提前帮我们执行的代码
  "setupFilesAfterEnv": [
    "./__tests__/utils/setupTests.js"
  ],
  "testMatch": [
    // jest执行任意目录下的__tests__目录下任意子目录或者后代目录下的以.test.js结尾的文件
    '**/__tests__/**/*.(test).js',

    "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    // 当测试文件引入js|jsx|mjs|cjs|ts|tsx文件时先用babel-jest转化然后在使用
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
    // 当测试文件引入css文件的时候，将css文件用cssTransform.js转化返回一个{}
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    // 当测试文件中引入的不是js|jsx|mjs|cjs|ts|tsx|css|json文件的时候， 用fileTransform.js文件将这个文件转换后在使用
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    //不转化哪些文件， 不转化node_modules中js|jsx|mjs|cjs|ts|tsx文件
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    // 不转化node_modules中css|sass|scss文件 的css module 引入
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "modulePaths": [],
  // 当在测试文件中引入css 通过css module的时候， 这个时候将cssmodule引入的东西转化成一个简单对象使测试不会出错通过identity-obj-proxy
  "moduleNameMapper": {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  // 测试文件中引入模块自动匹配后缀， 不需要在引入的时候写后缀了
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx",
    "json",
    "jsx",
  ],
  // 添加自定义jest执行时候的模式， 和 u ，w模式是一样的那种模式
  "watchPlugins": [
  ],
  "resetMocks": true
};
