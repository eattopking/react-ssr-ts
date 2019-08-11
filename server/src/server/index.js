// 服务端代码

import Koa from "koa";
import Router from "koa-router";
// 给koa-router设置响应头,默认就可以设置很多,有而外需求在看文档
import KoaBody from "koa-body";
// 静态资源服务管理中间件
import koaStatic from "koa-static";
import render from "../utils";


// 创建koa实例
const app = new Koa();
// 创建koa路由实例
const router = new Router();

// 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
// 这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
app.use(koaStatic("public"));
// 给koa-router设置响应头的很多信息
app.use(KoaBody());
// 返回页面
router.get("/", ctx => {
  ctx.body = render({ url: ctx.request.url });
});

// 增行接口
router.get("/addrow", ctx => {
  ctx.body = {
    status: true,
    row: [
      {
        key: "1",
        name: "复杂表格",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      },
      {
        key: "4",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      },
      {
        key: "5",
        name: "五行",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ]
  };
});

// 删行接口
router.get("/delete", ctx => {
  ctx.body = {
    status: true,
    row: []
  };
});

// allowedMethods给相应报文自动增加上状态码和allow 字段
// app.use(router.routes()) 这是一次性注册使用react-router接口中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(8000);
