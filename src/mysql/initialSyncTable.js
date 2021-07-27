// 同步当前最新表结构到数据库, 并且给表添加初始值
const sequelize = require("./dbConn.js");
const pageTable = require("./models/page_table");
const userTable = require("./models/user_table");

// 初始同步数据库表结构, 强制同步，先删除表，然后新建, 并给表设置初始值
sequelize
  .sync({
    // 强制同步，先删除表，然后新建
    force: true
  })
  .then(() => {
    // 设置主页表的初始值
    return pageTable
      .create({
        key: `${Math.random()}`,
        name: "夫夫公司",
        info: "保密",
      })
      .then(function(p) {
        console.log("created. " + JSON.stringify(p));
      })
      .catch(function(err) {
        console.log("failed: " + err);
      });
  })
  .then(() => {
    // 设置用户表的初始值
    return userTable
      .create({
        key: `${Math.random()}`,
        mail: "eattopking",
        password: "1234567",
        name: 'eattopking'
      })
      .then(function(p) {
        console.log("created. " + JSON.stringify(p));
      })
      .catch(function(err) {
        console.log("failed: " + err);
      });
  });
