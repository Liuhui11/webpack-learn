const path = require("path");

const { DllPlugin } = require("webpack");

module.exports = {
  entry: {
    jquery: ["jquery"],
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dllDist"),
    filename: "[name].dll.js",
    library: "jquery"
  },
  plugins: [
    new DllPlugin({
      //生成manifest.json文件，并指定他的输出位置
      path: path.join(__dirname, "./dllDist", "[name]-manifest.json"),
      name: "jquery" //!name要和library的名称一致
    })
  ]
}
