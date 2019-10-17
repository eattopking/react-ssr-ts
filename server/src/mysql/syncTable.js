// 同步当前最新表结构到数据库, 并且给表添加初始值
const sequelize = require("./dbConn.js");
const pageTable = require("./models/page_table");
const userTable = require("./models/user_table");

sequelize
  // 同步表结构
  .sync({
    // 强制同步，先删除表，然后新建
    force: true
  })
  .then(() => {
    // 设置主页表的初始值
    return pageTable
      .create({
        key: "1",
        name: "夫夫公司",
        address: "保密",
        information: "暂无"
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
        key: "1",
        mail: "eattopking",
        password: "1234567"
      })
      .then(function(p) {
        console.log("created. " + JSON.stringify(p));
      })
      .catch(function(err) {
        console.log("failed: " + err);
      });
  });
