class CopyrightWebpackPlugin {
    constructor(options) {
        // 接受参数
        console.log(options);
    }
  //compiler:webpack实例例 
  apply(compiler) {
      compiler.hooks.emit.tapAsync( // 异步
          'CopyrightWebpackPlugin',
          (compilation, cb) => {
            compilation.assets['copyright.txt'] = {
                source: function() {
                    return 'hello copy';
                },
                size: function() {
                    return 20;
                }
            };
            cb();
          }
      )
  }
}
module.exports = CopyrightWebpackPlugin;