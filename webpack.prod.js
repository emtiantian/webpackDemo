  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  const path = require("path");
  //清空dist目录
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const common = require('./webpack.common.js');
  const ROOT_PATH = path.resolve(__dirname);
  const BUILD_PATH = path.resolve(ROOT_PATH, 'prod');

      module.exports = merge(common, {
          mode :"production",
          output:{
              path:path.resolve(BUILD_PATH),
          },
        plugins: [
            //压缩js
            new UglifyJSPlugin(),
            new CleanWebpackPlugin([BUILD_PATH]),
            //压缩css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        ]
  });