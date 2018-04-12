  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const path = require("path");
  //清空dist目录
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const common = require('./webpack.common.js');
  const ROOT_PATH = path.resolve(__dirname);
  const APP_PATH = path.resolve(ROOT_PATH, './src');
  const BUILD_PATH = path.resolve(ROOT_PATH, 'prod');
      module.exports = merge(common, {
          mode :"production",
          entry: [ APP_PATH],
          output:{
              path:path.resolve(BUILD_PATH),
          },
        plugins: [
            new UglifyJSPlugin(),
            new CleanWebpackPlugin([BUILD_PATH])
        ]
  });