const path = require("path");

//修改html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//生成单独文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require("webpack");
//lodash 模块化加载
//LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
//引入glob
const glob = require('glob');

//entries函数
//获取全部的入口js
const entries = function () {
    let jsDir = path.resolve(ROOT_PATH, 'src');
    let entryFiles = glob.sync(jsDir + '/*/index.js');
    let map = {};

    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        let namearr = filePath.split("/");
        let pluginName = namearr[namearr.length - 2];
        map[pluginName] = filePath;
    }
    return map;
};
const htmljs = function () {
    let htmljsDir = path.resolve(ROOT_PATH, 'src');
    let entryFiles = glob.sync(htmljsDir + '/*/html/html.js');
    let arr = [];
    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        // let pluginName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('\/'));
        let namearr = filePath.split("/");
        let pluginName = namearr[namearr.length - 3];
        let htmlPlugin = new HtmlWebpackPlugin({
            filename: "index.html",
            template: filePath,
            //只引用当前包和common中的资源文件
            chunks: [pluginName,"vendor","runtime"],
            hash: true, // 为静态资源生成hassh值
            chunksSortMode: 'manual',//将chunks按引入的顺序排序
            inject: true,//所有JavaScript资源插入到body元素的底部
            minify: {
                removeAttributeQuotes: true//压缩 去掉引号
            },
            xhtml: true,
        });
        arr.push(htmlPlugin);
    }
    return arr;
};
//全部入口js文件
let entrys = entries();
// console.dir(entrys);
//获取全部的入口模板文件
let entrysHtmlJs = htmljs();
// console.dir(entrysHtmlJs[0].options.chunks);

//公共代码打包到一起 下方过期了
// let commonsChunkPlugin = new webpack.optimize.splitChunks({
//     name: 'commons', // 这公共代码的chunk名为'commons'
//     filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
//     minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
// });
//
// //第三方包单独打包
// let publgins =  new webpack.optimize.splitChunks({
//     name: "vendor",
//     // filename: "vendor.js"
//     // (给 chunk 一个不同的名字)
//
//     minChunks: Infinity,
//     // (随着 entry chunk 越来越多，
//     // 这个配置保证没其它的模块会打包进 vendor chunk)
// })

module.exports = {
    // entry: Object.assign(entrys, {vendor: ["jquery"]}),//第三方不参与编译和打包
    entry:entrys,
    output: {
        filename: "./assets/js/[name]_[hash].min.js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 5,
                            outputPath: 'assets/images/',//定义输出的图片文件夹
                            name: '[name]_[hash].[ext]'

                        },

                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: ["css-loader", "postcss-loader"]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 0,
                                localIdentName: '[local]',
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                })
            },
            {
                test: /\.ejs$/,
                use: "ejs-loader"
            }
        ]
    },
    resolve: {
        //解析less 不需要后缀
        extensions: ['.less', ".png", ".jpg", ".svg", ".gif", ".js"],
        // alias: {
        //     juqery: require("jquery")
        // }

    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname,'src/pluginDemo/html/','html.js'),//模板
    //         filename:'index.ejs',
    //         hash:true,//防止缓存
    //         minify:{
    //             removeAttributeQuotes:true//压缩 去掉引号
    //         }
    //     }),
    //     new ExtractTextPlugin('[name]_[hash].css'),
    // ]
    plugins: entrysHtmlJs
        .concat(new ExtractTextPlugin('[name]_[hash].css'))//导出单独的css文件
        .concat( new webpack.ProvidePlugin(
            { $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            })
        ),//设置公共变量
    optimization: {
        runtimeChunk: {
             name: "runtime",
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
                commons: {
                    name: "commons",
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    chunks: "initial", //默认所有块都起作用
                    minChunks: 3   // 设定要有3个chunk（即3个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
                }
            }
        }
    }

};
