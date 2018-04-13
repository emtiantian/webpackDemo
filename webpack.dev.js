const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require("path");
//清空dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, './src');
const BUILD_PATH = path.resolve(ROOT_PATH, './dist');
module.exports = merge(common, {
    mode :"development",
    //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的 现在在sever.js中设置
    entry: [ "webpack-hot-middleware/client?&timeout=20000&reload=true",APP_PATH],
    devtool: 'inline-source-map',
    output:{
        path:path.resolve(BUILD_PATH),
    },
    plugins:[
        //清空目录
        new CleanWebpackPlugin([BUILD_PATH]),
        // 实现刷新浏览器必写
        new webpack.HotModuleReplacementPlugin()
    ]
});