/**
 * 这是postcss的配置文件
 * 配置文件可以是一个函数最后return 一个对象也可以直接是一个对象
 * 这个配置文件的方式和wepack的配置文件的输出方式相同
 */

module.exports = ({ file, options, env }) => {
	const pluginsConfig = {
		autoprefixer: {}
	};
	return {
		plugins: pluginsConfig
	};
};
