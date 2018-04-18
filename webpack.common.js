const path = require("path");

//修改html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//生成单独文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//删除css
// const CleanCSSPlugin = require('less-plugin-clean-css');
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
        let pluginName =namearr[namearr.length-2];
        map[pluginName] = filePath;
    }

    return map;
}
const htmljs = function () {
    let htmljsDir = path.resolve(ROOT_PATH, 'src');
    let entryFiles = glob.sync(htmljsDir + '/*/html/html.js');
    let arr = [];
    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        // let pluginName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('\/'));
        let namearr = filePath.split("/");
        let pluginName =namearr[namearr.length-3];
        let htmlPlugin = new HtmlWebpackPlugin({
            filename: "index.html",
            template: filePath,
            //只引用当前包和common中的资源文件
            chunks: [pluginName],
            hash: true, // 为静态资源生成hassh值
            chunksSortMode: 'manual',//将chunks按引入的顺序排序
            inject  : true,//所有JavaScript资源插入到body元素的底部
            minify: {
                removeAttributeQuotes: true//压缩 去掉引号
            },
            xhtml: true,
        });
        arr.push(htmlPlugin);
    }
    return arr;
};
let entrys = entries();
console.dir(entrys);
//获取全部的模板js
let entrysHtmlJs = htmljs();
console.dir(entrysHtmlJs[0].options.chunks);

module.exports = {
    entry: entrys,
    output: {
        filename: "./[name]_[hash].js",
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
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
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
                            loader: 'less-loader',
                        }
                    ],
                })
            },
            {
                //html中引用img
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },{
                test: /\.ejs$/,
                use: "ejs-loader"
            }
        ]
    },
    resolve: {
        //解析less 不需要后缀
        extensions: ['.less', ".png", ".jpg", ".svg", ".gif", ".js"],

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
    // ],
    plugins: entrysHtmlJs.concat(new ExtractTextPlugin('[name]_[hash].css'))


};
