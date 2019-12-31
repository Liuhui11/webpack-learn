const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* === 优化 ===
 css
    1.提取 mini-css-extract-plugin
    2.压缩
 html
    1.压缩
 代码分割 code splitting 重点

 */ 
module.exports = {
    entry: './src/optimization/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'optDist')
    },
    mode: 'none', //  production(默认) | development | none
    optimization: {
        usedExports: true,
        runtimeChunk: "single", 
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass') // 使用dart-sass
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html', // 模板
            title: 'Webpack分享',
            minify: {
                // 压缩HTML⽂文件
                removeComments: true, // 移除HTML中的注释 
                collapseWhitespace: true, // 删除空⽩白符与换⾏行行符 
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[id].[name].[contenthash:8].css",
            chunkFilename: "[id].[name].[contenthash:8].css"
        })
    ]
}