
import './less/common.less';
import './less/head.css';
import img from './assets/2.png';



function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML ="webpack 自动部署 热启动成功啦!";
    element.classList.add("time");


    return element;
}

document.body.appendChild(component());
let  img4 = document.createElement("img");
console.dir(img.src)
img4.src = img.src;
document.body.appendChild(img4);


let timeElem =  document.createElement('div');
    // timeElem.classList.add("time")
let timer = setInterval(updateClock, 5000);
function updateClock() {
    timeElem.innerHTML = (new Date()).toString();
}
document.body.appendChild(timeElem);
if (module.hot) {
    // 模块自己就接收更新
    module.hot.accept();
    // dispose方法用来定义一个一次性的函数，这个函数会在当前模块被更新之前调用
    module.hot.dispose(function() {
        clearInterval(timer);
    });
}