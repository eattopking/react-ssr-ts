// 操作数据库api

// 同步当前最新表结构到数据库
const diffTable = require("./models/difftable");

// 查寻数据api

module.exports = {
  findAll: diffTable.findAll({
    where: {
      name: "zh"
    }
  })
};
