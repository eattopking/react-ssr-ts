/**
 * matchRoutes用来匹配对path路由的配置项,这个api比较牛逼,可以匹配到完整的包括子路由的配置数据
 * import { matchPath } from 'react-router-dom'只能匹配到第一层父路由的配置数据
 */
import { matchRoutes } from 'react-router-config';
import routes from '../containers/Home/routes';

import Router from 'koa-router';
import { getStore } from '../rootStore';
import { render, loginRender, registerRender } from './utils';
const Apis = require('../mysql/apis');

/**
 * 创建koa路由实例
 */
const router = new Router();

/**
 * 返回注册页
 */
router.get(
  '/register',
  async (ctx: { body: string; request: { url: string } }) => {
    ctx.body = registerRender();
  }
);

/**
 * 返回登录页
 */
router.get(
  '/login',
  async (ctx: { body: string; request: { url: string } }) => {
    ctx.body = loginRender();
  }
);

/**
 * 返回主页
 */
router.get('/page', async ctx => {
  const {
    request: { url },
    response,
    session,
    cookies
  } = ctx;
  const mail = cookies.get('mail');
  if (session[mail] === true) {
    // 匹配和url匹配的路由配置项对象
    // const matchedRoutes = matchRoutes(routes, ctx.request.url);
    const result = await Apis.findPageAll();
    /*
     * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
     * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
     * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
     * 将从数据库请求回来的展示数据，先转成字符串存在服务端返回的html的字符串的window的属性上，
     * 用于同构的前端代码redux中的默认初始数据， 使前端代码数据和初始化服务端返回页面数据同步
     * 存到window中叫做数据注水， 在前端取window中数据，初始化到redux中叫做数据脱水
     *
     * 在服务端将请求回来的数据也处理成redux store的初始数据， 然后传给组件， 在服务端将组件渲染成
     * 标签字符串时直接将数据都渲染进字符串里了， 达到服务端返回的字符串是包含完整数据的标签字符串
     */
    const store = getStore({
      page: { rows: JSON.parse(JSON.stringify(result)) }
    });

    // 当ctx.body在promise中使用时,外部回调函数一定要使用async, 一定要让对应的Promise等待
    ctx.body = render({
      url,
      context: {},
      store
    });
  } else {
    /**
     * 后台重定向返回登录页
     */
    response.redirect('/login');
  }
});

/**
 * 拉取全部数据接口
 */
router.get('/api/adddata', async ctx => {
  const {
    request: {
      query: { name, address, information }
    }
  } = ctx;
  await Apis.savePageData(name, address, information);
  /**
   * 数据库中新增的行
   */
  const result = await Apis.findPageAll();
  const allRows = JSON.parse(JSON.stringify(result));
  /*
   * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
   * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
   * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
   */
  ctx.body = {
    status: true,
    rows: allRows
  };
});

/**
 * 登录接口, 用于用户登录
 */
router.get('/api/signin', async ctx => {
  const {
    request: {
      query: { mail, password }
    },
    session,
    cookies
  } = ctx;
  // cookie的配置
  const cookieConfig = {
    maxAge: 86400000,
    autoCommit: true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false
  };
  /*
   * 使用sequelize findUserInfo 从mysql查回来的用户信息做比对实现登录,
   */
  const result = await Apis.findUserInfo(mail);
  /**
   * 密码比对成功,重定向到首页
   */
  if (password === JSON.parse(JSON.stringify(result))[0].password) {
    // 存储cookie和session用于用户鉴权
    session[mail] = true;
    cookies.set('mail', mail, cookieConfig);
    ctx.body = {
      status: true
    };
  } else {
    ctx.body = {
      status: false
    };
  }
});

/**
 * 注册接口, 用于用户注册
 */
router.get('/api/registerin', async ctx => {
  const {
    request: {
      query: { mail, password }
    }
  } = ctx;
  const result = await Apis.findUserMail();
  const mailList = JSON.parse(JSON.stringify(result)).reduce(
    (currentVlaue: any, value: { mail: string }) => {
      currentVlaue.push(value.mail);
      return currentVlaue;
    },
    []
  );
  if (mailList.includes(mail)) {
    ctx.body = {
      status: false,
      data: '1'
    };
  } else if (password.length < 7) {
    ctx.body = {
      status: false,
      data: '2'
    };
  } else {
    /*
     * 使用sequelize saveUserInfo 将用户信息存到数据库,
     */
    await Apis.saveUserInfo(mail, password);
    /**
     * 注册成功返回true
     */
    ctx.body = {
      status: true
    };
  }
});

export default router;
