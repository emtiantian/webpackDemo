const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-Hot-middleware");
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    //向控制台显示任何内容
    quiet: true
}));
let hotMiddleware = webpackHotMiddleware(compiler,{
    log: false,
    heartbeat: 1000,
});

app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('3000端口的node服务器开启啦\n');
});