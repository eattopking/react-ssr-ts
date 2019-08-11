// 同步当前最新表结构到数据库
const diffTable = require("./models/difftable");

// 同步表结构
diffTable.sync({
  force: true // 强制同步，先删除表，然后新建
});
