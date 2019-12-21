// 服务端代码
const session = require('koa-session');
import Koa from 'koa';
import router from './routes';
// 给koa-router设置响应头,默认就可以设置很多,有而外需求在看文档
import KoaBody from 'koa-body';
// 静态资源服务管理中间件
import koaStatic from 'koa-static';
import sessionStore from './sessionStore';

/**
 * 创建koa实例
 */
const app = new Koa();

/**
 * allowedMethods给相应报文自动增加上状态码和allow 字段
 * app.use(router.routes()) 这是一次性注册使用react-router接口中间件
 */
app.use(router.routes()).use(router.allowedMethods());

/**
 * 初始化session, 设置storage对象为外部存储
 */
app.keys = ['ffyyddyy@@521'];
app.use(session({ store: sessionStore }, app));

/**
 * 设置静态资源路径, 当客户端请求静态资源是,就到对应目录下寻找返回,
 * 这里直接设置项目目录下的目录名就行,直接koa就能找到,不用整那些乱七八糟的
 */
app.use(koaStatic('public'));

// 给koa-router设置响应头的很多信息
app.use(KoaBody());
app.listen(8000);
