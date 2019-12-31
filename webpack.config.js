const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyrightWebpackPlugin = require("./src/plugin.js");
module.exports = {
    // entry: './src/index.js',
    entry: './src/loader.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'basicDist')
    },
    mode: 'none',
    devServer: {
        contentBase: path.resolve(__dirname, "./basicDist"),
        open: true,
        port: 8080,
        hot: true, // 在运行过程中，替换、添加或删除模块，而无需重新加载整个页面（css支持好，js支持不完整）
        // hotOnly: true, // 强制浏览器不会刷新，哪怕你的HMR没有生效
        proxy: {
            "/api": {
                target: "http://localhost:9000"
            }
        },
    }, 
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 使用什么规则做转换
                        presets: ["@babel/preset-env"]
                    }
                    // options: {
                    //     presets: [
                    //         [
                    //             "@babel/preset-env",
                    //             {
                    //                 targets: {
                    //                     edge: "17",
                    //                     firefox: "60",
                    //                     chrome: "67",
                    //                     safari: "11.1"
                    //                 },
                    //                 corejs: 2, //新版本需要指定核⼼心库版本 
                    //                 useBuiltIns: "entry" //按需注⼊入
                    //             }
                    //         ]
                    //     ]
                    // }
                } 
            },
            {
                test: /\.scss$/,
                // use: [
                //     'style-loader', // 将js字符串生成为style节点
                //     'css-loader', // 将css转化为CommonJS模块
                //     'sass-loader' //将sass编译成css，默认使用node sass，使用dart sass可以跨平台
                // ]
                use: [
                    {
                        loader: 'style-loader'
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
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './src/replaceLoaderAsync.js'),
                        options: {
                            name: '刘慧'
                        }
                    },
                    {
                        loader: path.resolve(__dirname, "./src/replaceLoader.js"),
                        options: {
                            name: "hayley" 
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html', // 模板
            title: 'Webpack分享',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyrightWebpackPlugin({
            name: 'webpack-刘慧'
        })
    ]
}