# 结合 typescript react antd koa 的服务端渲染项目, 计划做一个复杂表格,没有涉及太多的业务

使用技术: koa2 react typescript webpack antd 数据库 mysql

使用 nodemon 监测项目目录下 dist 文件内容的变化,实现服务自动更新,
使用 pm2 替换 nodemon 和用 node 指令起 node 服务,pm2 很强大,可以监控进程还可以进行负载均衡
使用 webpack --watch 实现 webpack 代码自动编译
使用 nmp-run-all 实现指令合并,提高开发效率

使用 reactDom/server 里面的 renderToString 将组件虚拟 dom 转化成标签字符串, 并通过 koa 服务器返回,实现 react 服务端渲染(ssr),并通过同构原理,在向服务器请求一遍 js 代码,实现事件注册,服务端返回浏览器需要的同构代码,react 虚拟 dom 与真实 dom 的结合产生,渲染和控制真实 dom 的 api 是 hydrate(服务端渲染固定使用),而不是浏览器端渲染常用的 render
