// 操作数据库api
const pageTable = require("./models/page_table");
const userTable = require("./models/user_table");

module.exports = {
  // 获取主页数据
  findPageAll: pageTable.findAll(),
  // 获取制定用户信息
  findUserInfo: userName =>
    userTable.findAll({
      // where是设置查询条件的
      where: {
        mail: userName
      }
    }),
  // 存储用户信息
  saveUserInfo: (userName, password) =>
    userTable.create({
      key: Math.random(),
      mail: userName,
      password
    })
};
