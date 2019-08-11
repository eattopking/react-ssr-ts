// 建表 创建复杂表格的数据库表结构
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = require("../dbConn.js");

const diffTable = sequelize.define(
  "difftable",
  {
    key: DataTypes.STRING(100),
    name: DataTypes.STRING(100),
    age: DataTypes.STRING,
    address: DataTypes.STRING
  },
  {
    timestamps: false, // 不要默认时间戳
    tableName: "difftable" // 设置表名,否则将是difftables
  }
);

module.exports = diffTable;
