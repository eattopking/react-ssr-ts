# 搞一个 typescript 结合 react 服务器端的项目玩,目标搞一个后端增删改查的复杂表格

使用技术: koa2 react typescript webpack 数据库mysql

使用 nodemon 监测项目目录下 dist 文件内容的变化,实现服务自动更新
使用 webpack --watch 实现 webpack 代码自动编译
使用 nmp-run-all实现指令合并,提高开发效率
使用 reactDom/server里面的renderToString将组件虚拟dom转化成标签字符串, 并通过koa服务器返回,实现react 服务端渲染(ssr)
