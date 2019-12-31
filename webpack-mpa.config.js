const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
// 多页面打包通用方案
const setMPA = () => {
    const entries = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/mpa/*/index.js'));
    entryFiles.map((item) => {
        const entryFile = item;
        console.log(entryFile, 'entryFile---------');
        const match = entryFile.match(/src\/mpa\/(.*)\/index\.js$/); // (.*)贪婪匹配，如：a.*b，会匹配从a开始到b结束的字符串
        const pageName = match && match[1];
        entries[pageName] = entryFile;
        console.log(match, 'match----------');
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                template: 'index.html', // 模板
                title: pageName,
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true
            })
        )
    });
    return {
        entries,
        htmlWebpackPlugins
    }
}
const { entries, htmlWebpackPlugins } = setMPA();
module.exports = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'mpaDist')
    },
    mode: 'none', //  production(默认) | development | none
    module: {
        rules: [
            {
                test: /\.scss$/,
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
            }
        ]
    },
    plugins: [
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin()
    ]
}