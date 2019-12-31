const loaderUtils = require("loader-utils");//官⽅方推荐处理理
module.exports = function(source) {
    const options = this.query;
    // console.log(source, options.name, '测试11111111')
    return source.replace('world', options.name);
}
