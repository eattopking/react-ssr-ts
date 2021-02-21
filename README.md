# 结合 typescript react antd koa 的服务端渲染项目, 计划做一个复杂表格,没有涉及太多的业务

### 技术栈

koa2、 react、redux、react-router、typescript、 webpack、 antd、 数据库 mysql


### 服务端渲染(ssr)

#### 主要原理:

1、同构(服务端和客户端两套代码各执行一遍,由客户端代码接手表格的事件),
2、数据的脱水和注水, 将服务端代码渲染表格时的数据, 缓存到window中(注水),用于客户端代码接手界面时,初始化请求数据的同时, 用缓存的数据直接渲染界面防止抖动(脱水)

### 主要技术点运用

1. 使用 nodemon 监测项目目录下 dist 文件内容的变化,实现服务自动更新,使用 pm2 替换 nodemon 和用 node 指令起 node 服务,pm2 很强大,可以监控进程还可以进行负载均衡
2. 使用 webpack --watch 实现 webpack 代码自动编译
3. 使用 nmp-run-all 实现指令合并,提高开发效率
4. 使用 reactDom/server 里面的 renderToString 将组件虚拟 dom 转化成标签字符串, 并通过 koa 服务器返回,实现 react 服务端渲染(ssr),并通过同构原理,在向服务器请求一遍 js 代码,实现事件注册,服务端返回浏览器需要的同构代码,react 虚拟 dom 与真实 dom 的结合产生,渲染和控制真实 dom 的 api 是 hydrate(服务端渲染固定使用),而不是浏览器端渲染常用的 render
5. react-router 的loadData属性,是在渲染匹配的路由所对应的组件之前,执行的回调, 在服务端渲染很有用
6. react-router-config 是是一个独立的npm包, 它的matchRoutes API用于匹配和url匹配的路由配置项对象

还有一些缺陷, 不能打包自定义的样式文件,在服务端打包的时候, 在服务端打包的时候,还没有style的样式注入

目标： 这个项目的目标就是改造成一个个人介绍的博客， 将webpack弄得更加熟练完备，可以稳定起来服务实时调试我的ssr项目，然后最后是将webpack 从4切到5， 在就是将ssr项目部署的时候， 使用完全的docker部署， 将每次服务端渲染引用的文件名称，可以在构建完成的时候根据生成的新的文件名称实时替换服务端渲染里面的文件名称




