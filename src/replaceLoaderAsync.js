const loaderUtils = require("loader-utils");
module.exports = function(source) {
    // const options = this.query; // 接收配置文件传递进来的参数
    const options = loaderUtils.getOptions(this);
    const callback = this.async(); 
    setTimeout(() => {
      const result = source.replace("world", options.name);
      // console.log(source, options.name, '测试222222')
      callback(null, result);
    }, 3000);
};