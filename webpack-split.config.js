const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: 'none',
  entry: {
    app: "./src/split/app.js"
  },
  output: {
    path: path.resolve(__dirname, "splitDist"), // 打包后的输出目录
    filename: "[id].[name].[contenthash:8].bundle.js", // 在development模式下,id为name
    chunkFilename: "[id].[name].[contenthash:8].chunk.js" // 没有入口的需要打包的模块代码
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single", // webpack运行时代码单独提取为一个包 runtime.js
    splitChunks: { // 代码分割
      minSize: 30000,
      cacheGroups: {
        async: { // 为异步代码打成一个公共包(在app.js修改一下代码,重新打包,不影响此包hash)
          name: 'async',
          chunks: 'async', // 为异步代码打包
          minChunks: 1,
          minSize: 0
        },
        vendors: { // 由于第三方代码变动比较小，所以把所有第三方单独打包，利于缓存(在app.js修改一下代码,重新打包,不影响此包hash)
          test: /[\\/]vendor[\\/]/,
          name: 'vendor',
          chunks: 'all', // 设置为all
          minChunks: 1,
          minSize: 0// 这里为了演示，设置为0以满足打包条件
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // 自动生成html,并且自动导入所有依赖同步包
      filename: "index.html",
      template: "./index.html",
      minify: {
        // collapseWhitespace: true // 压缩
      }
    }),

    new MiniCssExtractPlugin({
      filename: "[id].[name].[contenthash:8].css",
      chunkFilename: "[id].[name].[contenthash:8].css"
    })
  ]

}