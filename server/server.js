const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-Hot-middleware");
const app = express();
const config = require('../webpack.dev.js');
const compiler = webpack(config);
const  open = require('opn');
const  port = 3000;



//设置‘webpack.dev.js’的入口配置，如果通过这种动态设置的方法，请一定注意webpack.dev.js里面入口的写法
// Object.keys(config.entry).forEach(function(key) {
//     config.entry[key] = ['webpack-hot-middleware/client?&timeout=20000&reload=true'].concat(config.entry[key]);
// })

let hotMiddleware = webpackHotMiddleware(compiler,{
    log: console.log,
    heartbeat: 10 * 1000
});
let devMiddleware =webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    //向控制台显示任何内容
    quiet: true,
    stats: {
        colors: true,
    }
});
app.use(devMiddleware);
app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(port, function () {
    console.log(port+'端口的node服务器开启啦\n');
});
//第一次运行启动浏览器
devMiddleware.waitUntilValid(function() {
    // console.log("listen at localhost:" + port);
    //auto open browser
    open('http://localhost:' + port);
});