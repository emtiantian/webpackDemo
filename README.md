# webpackDemo
## webpack 基本配置
1. js支持
    >es6,压缩合并，es6转es5,生产环境支持压缩，hash，模块分离，source-map，公共类提取，
2. 服务器
    >热启动，自动刷新浏览器，express服务器，
3. css
    >支持less，支持css，支持css压缩，css整合，hash，模块分离，source-map，css自动加前缀
4. img整合
    >支持less内嵌，支持html内嵌，支持js引入，支持img过小转base64引入
5. html整合
    >支持html模板,支持html模块化
6. 多入口
    >支持多个组件组合，或多个页面
7. 多出口
    >多页面应用
8. 单元测试
    >单元测试框架，和自动测试
9. 按需加载
```
参考：https://juejin.im/post/59bb37fa6fb9a00a554f89d2
```
10. 模块分离 
    >添加了公共模块分离和第三方模块分开打包
11. 现有问题
    >css 和 html 的修改没有自动刷新浏览器,html模板没有完全运用es6，
    雪碧图没有加入使用,单个组件打包命令
## 使用方式
 初始化
``` npm
npm i
```
开启本地开发模式
```npm
npm  run server
```
打包部署
``` npm
npm run build //生产模式打包
部署要自定义脚本
```
单元测试
```npm
npm run test
```

