// 服务端代码
import Koa from "koa";
import Router from "koa-router";
// 给koa-router设置响应头,默认就可以设置很多,有而外需求在看文档
import KoaBody from "koa-body";
// 静态资源服务管理中间件
import koaStatic from "koa-static";
import render from "../utils";

const Apis = require("../mysql/apis");
// 创建koa实例
const app = new Koa();
// 创建koa路由实例
const router = new Router();


/*
  设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
  这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
*/
app.use(koaStatic("public"));
// 给koa-router设置响应头的很多信息
app.use(KoaBody());
// 返回页面
router.get("/", ctx => {
  ctx.body = render({ url: ctx.request.url });
});

// 增行接口
router.get("/addrow", async ctx => {
  await Apis.findAll.then(result => {
    /*
      使用sequelize findall 从mysql查回来的数据是不能直接使用的,
      需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
      在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
    */
   console.log('JSON.parse(JSON.stringify(result))', JSON.parse(JSON.stringify(result)))
    ctx.body = {
      status: true,
      rows: JSON.parse(JSON.stringify(result))
    };
  });
});

// 删行接口
router.get("/delete", ctx => {
  ctx.body = {
    status: true,
    row: []
  };
});

/**
 * allowedMethods给相应报文自动增加上状态码和allow 字段
 * app.use(router.routes()) 这是一次性注册使用react-router接口中间件
 */
app.use(router.routes()).use(router.allowedMethods());
app.listen(8000);
