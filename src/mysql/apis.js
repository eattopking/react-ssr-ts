// 操作数据库api
const pageTable = require("./models/page_table");
const userTable = require("./models/user_table");

module.exports = {
  /**
   * 获取主页数据
   */
  findPageAll: () => pageTable.findAll(),

  /**
   * 增加主页信息
   */
  savePageData: (name, info) =>
  pageTable.create({
    key: Math.random(),
    name,
    info
  }),

  // 获取指定用户信息
  findUserInfo: userName =>
  userTable.findAll({
    // where是设置查询条件的
    where: {
      mail: userName
    }
  }),

  /**
   *查找所有用户邮箱
   */
  findUserMail: () =>
  userTable.findAll({
    attributes: ["mail"]
  }),

  /**
   * 存储用户信息
   */
  saveUserInfo: (userName, password, name) =>
  userTable.create({
    key: Math.random(),
    mail: userName,
    password,
    name
  })
};
