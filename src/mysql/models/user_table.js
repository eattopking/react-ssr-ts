// 建表 创建复杂表格的数据库表结构
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = require("../dbConn.js");

//创建表
const userTable = sequelize.define(
  "userTable",
  // 设置表字段, 并规范类型, 好像只有第一次有用,之后好像没啥用了
  {
    key: DataTypes.STRING(1000),
    mail: DataTypes.STRING(1000),
    password: DataTypes.STRING(1000),
    name: DataTypes.STRING(1000),
  },
  {
    // 不要默认时间戳
    timestamps: false,
    // 设置表名,否则将是difftables
    tableName: "userTable"
  }
);

module.exports = userTable;
