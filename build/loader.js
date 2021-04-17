// 自定义loader 替换node代码中的js和css引用文件名称， 根据每次的前端代码构建

const utils = require('loader-utils');

const { getOptions } = utils;

module.exports = function (source) {
    const options = getOptions(this);

    Object.keys(options).forEach((item) => {
        const reg = new RegExp(item, 'ig');
        source = source.replace(reg, options[item]);
    });

    return source;
}