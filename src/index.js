

function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML ="webpack 自动部署 热启动成功啦!";


    return element;
}

document.body.appendChild(component());