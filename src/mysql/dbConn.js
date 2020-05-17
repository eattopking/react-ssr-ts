const Sequelize = require("sequelize");
const config = require("./mysql.config");

// 创建连接数据库对象
const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: "mysql",
  dialectOptions: {
    /**
     * 指定套接字文件路径 本地连接数据就能连接到它,
     * 阿里云服务器上就连接不到,之后在仔细研究sequelize的配置
    */
    // socketPath: "/tmp/mysql.sock"
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
