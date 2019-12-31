const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  entry: ["./src/dll.js"],
  mode: "none",
  output: {
    path: path.resolve(__dirname, "./dllDist"),
    filename: "main.js"
  },
  plugins: [
    new webpack.DllPlugin({
      //生成manifest.json文件，并指定他的输出位置
      path: path.join(__dirname, "./dllDist", "[name]-manifest.json"),
      name: "jquery" //!name要和library的名称一致
    }),
    // 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
    new webpack.DllReferencePlugin({
       manifest: require('./dllDist/jquery-manifest.json')
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
     }),
     new HtmlIncludeAssetsPlugin({
        assets: ['./jquery.dll.js'], // 添加的资源相对html的路径
        append: false // false 在其他资源的之前添加 true 在其他资源之后添加
    })
]
};
