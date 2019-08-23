// 操作数据库api
const diffTable = require("./models/difftable");

module.exports = {
  // 查寻数据api
  findAll: diffTable.findAll({
    // where是设置查询条件的
    // where: {
    //   name: "zh"
    // }
  })
};
