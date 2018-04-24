import './less/common.less';
import './less/head.css';
// import $ from "jquery";



function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = "webpack 自动部署 热启动成功啦!";
    element.classList.add("example");
    return element;
}
// alert("1234");
document.body.appendChild(component());
let buttonLink = document.createElement("button");
    buttonLink.classList.add("link");
    buttonLink.id = "qwe";
    buttonLink.innerText = "下载";
    document.body.appendChild(buttonLink);


$(function () {
    console.log($(".link").html());
    document.getElementById("qwe").onclick  = function () {
        alert("点击到了js");
    };
    $("#qwe").on("click",function () {
        alert("点击到了jquery");
    })

});



