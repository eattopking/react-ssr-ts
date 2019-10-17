// 服务端代码
import Koa from "koa";
import Router from "koa-router";
// 给koa-router设置响应头,默认就可以设置很多,有而外需求在看文档
import KoaBody from "koa-body";
// 静态资源服务管理中间件
import koaStatic from "koa-static";
import { render, loginRender, registerRender } from "../utils";
/**
 * matchRoutes用来匹配对path路由的配置项,这个api比较牛逼,可以匹配到完整的包括子路由的配置数据
 * import { matchPath } from 'react-router-dom'只能匹配到第一层父路由的配置数据
 */
import { matchRoutes } from "react-router-config";
import routes from "../containers/Home/routes";
import { getStore } from "../rootStore";

const Apis = require("../mysql/apis");
// 创建koa实例
const app = new Koa();
// 创建koa路由实例
const router = new Router();
/**
 * 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
 * 这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
 */
app.use(koaStatic("public"));
// 给koa-router设置响应头的很多信息
app.use(KoaBody());

/**
 * 返回注册页
 */
router.get("/register", async (ctx: { body: string; request: { url: string } }) => {
  ctx.body = registerRender();
});

/**
 * 返回登录页
 */
router.get("/login", async (ctx: { body: string; request: { url: string } }) => {
  ctx.body = loginRender();
});

// 返回主页
router.get("/page", async (ctx: { body: string; request: { url: string } }) => {
  // 匹配和url匹配的路由配置项对象
  // const matchedRoutes = matchRoutes(routes, ctx.request.url);

  await Apis.findAll.then((result: object) => {
    /*
     * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
     * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
     * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
     * 并且给请求回来的数据设置成redux的默认数据,最后经这些数据存到window上, 用于注水
     */
    const store = getStore({ simple: { rows: JSON.parse(JSON.stringify(result)) } });

    // 当ctx.body在promise中使用时,外部回调函数一定要使用async, 一定要让对应的Promise等待
    ctx.body = render({
      url: ctx.request.url,
      context: {},
      store
    });
  });
});
// 返回复杂表格首页
router.get("/login/diff", async (ctx: { body: string; request: { url: string } }) => {
  // 匹配和url匹配的路由配置项对象
  // const matchedRoutes = matchRoutes(routes, ctx.request.url);

  await Apis.findAll.then((result: object) => {
    /*
     * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
     * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
     * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
     * 并且给请求回来的数据设置成redux的默认数据,最后经这些数据存到window上, 用于注水
     */

    const store = getStore({ diff: { rows: JSON.parse(JSON.stringify(result)) } });

    // 当ctx.body在promise中使用时,外部回调函数一定要使用async, 一定要让对应的Promise等待
    ctx.body = render({
      url: ctx.request.url,
      context: {},
      store
    });
  });
});

/**
 * 接口区域
 */

// 增行接口
router.get("/addrow", async (ctx: { body: object }) => {
  await Apis.findAll.then((result: object) => {
    /*
     * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
     * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
     * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
     */
    ctx.body = {
      status: true,
      rows: JSON.parse(JSON.stringify(result))
    };
  });
});

/**
 * 登录接口, 用于用户登录
 */
router.get("/signin", async ctx => {
  /*
   * 使用sequelize findUserInfo 从mysql查回来的用户信息做比对实现登录,
   */
  await Apis.findUserInfo(ctx.request.query.mail).then((result: string) => {
    /**
     * 密码比对成功,重定向到首页
     */
    if (ctx.request.query.password === JSON.parse(JSON.stringify(result))[0].password) {
      ctx.status = 301;
      ctx.redirect("/page");
    } else {
      ctx.body = {
        status: false
      };
    }
  });
});

// 删行接口
router.get("/delete", (ctx: { body: object }) => {
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
