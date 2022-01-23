// 建表 创建复杂表格的数据库表结构
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = require("../dbConn.js");
const { ContentDataBase } = require("../database.js");

//创建表
const sessionTable = ContentDataBase.getCurrentConnection().define(
  "sessionTable",
  // 设置表字段, 并规范类型, 好像只有第一次有用,之后好像没啥用了
  {
    key: DataTypes.STRING(100),
    sessionid: DataTypes.STRING(100),
    status: DataTypes.STRING(100)
  },
  {
    // 不要默认时间戳
    timestamps: false,
    // 设置表名,否则将是difftables
    tableName: "sessionTable"
  }
);

module.exports = sessionTable;
