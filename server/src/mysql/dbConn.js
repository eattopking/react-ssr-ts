const Sequelize = require("sequelize");
const config = require("./mysql.config");

// 创建连接数据库对象
const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: "mysql",
  dialectOptions: {
    // 指定套接字文件路径
    socketPath: "/tmp/mysql.sock"
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
