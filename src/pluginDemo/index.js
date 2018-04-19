import './less/common.less';
import './less/head.css';


function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = "webpack 自动部署 热启动成功啦!";
    element.classList.add("example");
    return element;
}

document.body.appendChild(component());
let buttonLink = document.createElement("button");
    buttonLink.classList.add("link");
    buttonLink.innerText = "下载";
    document.body.appendChild(buttonLink);



function  reload() {
    document.body.innerHTML ="";
}
//热模块更新
if(module.hot){
    // 模块自己就接收更新
    module.hot.accept({
        callback:function () {
            //在触发更新的时候调用函数的reload方法
            this.reload();
        }
    });
}