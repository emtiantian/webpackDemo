const path = require("path");

//修改html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//lodash 模块化加载
//LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports={

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
            }
        ]
    },
    plugins:[

        new HtmlWebpackPlugin({
            title: 'Output Management',
            inject:"true"
        }),
    ],
    // devServer: {
    //     contentBase: './dist',
    //     hot: true
    // }

};
