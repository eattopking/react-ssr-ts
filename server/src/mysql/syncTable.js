// 同步当前最新表结构到数据库, 并且给表添加初始值
const sequelize = require("./dbConn.js");

// 只同步表结构, 与数据库简历链接,可对数据库进行操作, 数据库原有都不改变
sequelize.sync({});
