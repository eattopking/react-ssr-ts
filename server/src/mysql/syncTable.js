// 同步当前最新表结构到数据库, 并且给表添加初始值
const sequelize = require("../dbConn.js");
const diffTable = require("./models/difftable");

sequelize
  // 同步表结构
  .sync({
    force: true // 强制同步，先删除表，然后新建
  })
  .then(() => {
    // 设置表的初始值
    return diffTable
      .create({
        key: "1",
        name: "zh",
        age: "27",
        address: "33333"
      })
      .then(function(p) {
        console.log("created. " + JSON.stringify(p));
      })
      .catch(function(err) {
        console.log("failed: " + err);
      });
  });
