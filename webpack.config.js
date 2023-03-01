const path = require('path');
var MinCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var getHtmlConfig = function (name) {
  return {
    template: __dirname + '/src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    // 指定要引入的 HTML 的js模块，对应 entry 的chunk
    chunks: ['common', name]

  };
};

var config = {
  entry: {
    'login': [__dirname + '/src/page/login/index.js'],
    'index': [__dirname + '/src/page/index/index.js'],
  },
  output: {
    // /src/page/login/index.js -> js/login.js 
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    // css单独打包
    new MinCssExtractPlugin(
      { filename: 'css/[name].css', }
    ),
    // 打包html
    new HtmlWebpackPlugin(getHtmlConfig('login')),

  ],
  // 额外引入 jQuery
  externals: {
    'jquery': 'window.jQuery'
  },

  module: {
    rules: [
      { test: /\.css$/, use: [MinCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(gif|png|jpg|jpeg|woff|svg|eotttf)\??.*$/, use: { loader: 'url-loader', options: { limit: 10, name: '[name].[ext]', outputPath: 'resource/', publicPath: '../resource/' } } },]
  },

  resolve :{
    alias : {
        util    : __dirname + '/src/util',
        page    : __dirname + '/src/page',
        service : __dirname + '/src/service',
        image   : __dirname + '/src/images',
    }
},
};

module.exports = config;