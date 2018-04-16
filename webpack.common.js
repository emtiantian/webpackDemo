const path = require("path");

//修改html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//生成单独文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//删除css
const CleanCSSPlugin = require('less-plugin-clean-css');
//lodash 模块化加载
//LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
//引入glob
const glob = require('glob');

//entries函数
const entries= function () {
    let jsDir = path.resolve(ROOT_PATH, 'src');
    let entryFiles = glob.sync(jsDir + '/*/*.js');
    let map = {};

    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        if(process.env.NODE_ENV === "development"){
            map[filename]=["webpack-hot-middleware/client?noInfo=true&reload=true",filePath];
        }
        map[filename]=filePath;
    }

    return map;
}
let  entrys = entries();
module.exports={

    entry:entrys ,
    output:{
        filename:"[name]_[hash].js",
        publicPath: '/'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use:[
                        {
                            loader: 'css-loader',
                            options:{
                                modules:true,
                                importLoaders:1,
                                localIdentName:'[local]',
                            }
                        },
                        {
                            loader:'less-loader',
                        }
                    ],
                    // fallback: 'style-loader',
                })
            },{
                test:/\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024*5,
                            publicPath: 'assets/images/',
                            outputPath:'assets/images/',//定义输出的图片文件夹
                            name: '[name].[hash].[ext]'

                        },

                    }
                ]
            },{
                test:/\.(html|htm)$/,
                use:'html-withimg-loader'
            }
        ]
    },
    resolve: {
        //解析less 不需要后缀
        extensions: ['.less',".png",".jpg",".svg","gif"]
    },
    plugins:[

        new HtmlWebpackPlugin({
            title: 'Output Management',
            inject:"true"
        }),
        new ExtractTextPlugin('[name]_[hash].css'),
    ],
    // devServer: {
    //     contentBase: './dist',
    //     hot: true
    // }

};
