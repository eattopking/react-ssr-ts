/**
 * matchRoutes用来匹配对path路由的配置项,这个api比较牛逼,可以匹配到完整的包括子路由的配置数据
 * import { matchPath } from 'react-router-dom'只能匹配到第一层父路由的配置数据
 */
// import { matchRoutes } from 'react-router-config';
// import routes from '../containers/Home/routes';

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
    request,
    response,
    session,
    cookies
  } = ctx;
  const { url } = request;
  const mail = cookies.get('mail');

  if (session[mail]) {
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
     *
     * 并且给请求回来的数据设置成redux的默认数据,最后经这些数据存到window上, 用于注水
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

    return;
  }
  /**
  * 后台重定向返回登录页
  */
  response.redirect('/login');
});


//======================数据接口========================

// 获取页面全部数据
router.get('/api/pageData', async ctx => {

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
 * 添加数据接口
 */
router.get('/api/addData', async ctx => {
  const {
    request: {
      query
    },
    cookies
  } = ctx;

  // 获取用户名称
  const { info } = query;
  const mail = cookies.get('mail');
  const userInfo = await Apis.findUserInfo(mail);
  const name = JSON.parse(JSON.stringify(userInfo))[0].name;

  await Apis.savePageData(name, info);

  /*
   * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
   * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
   * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
   */
  ctx.body = {
    status: true
  };
});

/**
 * 获取用户名
 */
router.get('/api/getName', async ctx => {
  const {
    cookies
  } = ctx;

  const mail = cookies.get('mail');
  const userInfo = await Apis.findUserInfo(mail);
  const name = JSON.parse(JSON.stringify(userInfo))[0].name;

  /*
   * 使用sequelize findall 从mysql查回来的数据是不能直接使用的,
   * 需要用JSON.stringify转换成json字符串, JSON.stringify真牛逼,
   * 在node中处理数据库数据,JSON.stringify 和 JSON.parse就可以搞定
   */
  ctx.body = {
    status: true,
    name
  };
});

/**
 * 登录接口, 用于用户登录
 */
router.get('/api/signIn', async ctx => {
  const {
    request: {
      query
    },
    session,
    cookies
  } = ctx;

  const { mail, password } = query;
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
    session[mail] = 1;
    cookies.set('mail', mail, cookieConfig);

    ctx.body = {
      status: true
    };
    return;
  }
  ctx.body = {
    status: false
  };
});

/**
 * 注册接口, 用于用户注册
 */
router.get('/api/registerIn', async ctx => {
  const {
    request: {
      query
    }
  } = ctx;
  const { mail, password, name } = query;
  const result = await Apis.findUserMail();

  const mailList = JSON.parse(JSON.stringify(result)).reduce(
    (currentValue: any, value: { mail: string }) => {
      currentValue.push(value.mail);
      return currentValue;
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
    await Apis.saveUserInfo(mail, password, name);
    /**
     * 注册成功返回true
     */
    ctx.body = {
      status: true
    };
  }
});

export default router;
