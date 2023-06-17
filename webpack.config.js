const path = require('path');
var MinCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

// 打包 html ，同时引入对应的JS， 每个html中引入打包的common名称的JS
var getHtmlConfig = function (name, title) {
    return {
        template    : __dirname + '/src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true, 
        hash        : true,
        // 指定要引入的 HTML 的js模块，对应 entry 的chunk
        chunks: ['common', name]

    };
};

var config = {
    // js 打包
    entry: {
        'common'        :   [__dirname + '/src/page/common/index.js'],
        'user-login'    :   [__dirname + '/src/page/user-login/index.js'],
        'index'         :   [__dirname + '/src/page/index/index.js'],
        'result'        :   [__dirname + '/src/page/result/index.js'],
    },
    output: {
        // /src/page/login/index.js -> js/login.js
        // publicPath  : '/dist/',
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    devServer: {
        port: 8088,
        proxy: {
            '**/*.do': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },

    plugins: [
        // css单独打包
        // /src/page/login/index.css -> css/login.css
        new MinCssExtractPlugin(
            {filename: 'css/[name].css',}
        ),
        // 打包 HTML
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),

    ],
    // 额外引入 jQuery
    externals: {
        'jquery': 'window.jQuery'
    },

    // 打包的时候使用到的模块，用来处理文字，图片等等
    module: {
        rules: [
            // 打包 css
            {test: /\.css$/, use: [MinCssExtractPlugin.loader, 'css-loader']},
            // 打包 string 的html  , 这里设置为以 .string  结尾
            {test: /\.string$/, use: ['html-loader']},
            // 图片打包到 resource 中
            {
                test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
                use: {
                    loader: 'url-loader',
                    options: {limit: 10, name: '[name].[ext]', outputPath: 'resource/', publicPath: '../resource/'}
                }
            },]
    },

    // 别名
    resolve: {
        alias: {
            node_module     : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/images',
        }
    },
    mode: 'development'
};

module.exports = config;
