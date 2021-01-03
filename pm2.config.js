/**
 * @param pm2的配置文件
 * 引入pm2起node服务,这是pm2的配置文件,也有命令行的参数,可以同时使用,和webpack很像,
 * pm2就是一个为了起node项目方便的cli,和webpack-cli差不多,pm2使用方式还有配置文件和配置文件使用法方式都和webpack一样
 */

module.exports = {
  apps: [
    {
      // 应用名称
      name: "tablessr",
      script: "./dist/index.js", // 启动文件地址
      cwd: "./", // 当前工作路径
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        "dist"
      ],
      ignore_watch: [
        // 忽视这些目录的变化
        "node_modules"
      ],
      // 做负载均衡 根据机器CPU核数，开启对应数目的进程运行项目
      instance: "max",
      // node的启动模式
      node_args: "--harmony",
      env: {
        // 设置运行环境，此时process.env.NODE_ENV的值就是development
        NODE_ENV: "development",
        ORIGIN_ADDR: "http://www.yoduao.com"
      },
      env_production: {
        NODE_ENV: "production"
      },
      // 普通日志路径
      out_file: "./logs/out.log",
      // 错误日志路径
      error_file: "./logs/err.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ]
};
