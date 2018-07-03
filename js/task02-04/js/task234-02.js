$(function(){
//结束游戏确认框
$("header img:last").click(function(){
  var r=confirm("结束本轮游戏吗?");
  if (r==true){
    window.location.href = "../html/task234-01.html";
  }
});
//开始游戏按钮
$("footer").click(function(){
  window.location.href = "../html/task234-taiben.html";
});
// //跳转至法官台本页面
// document.getElementsByTagName('footer')[0].onclick=function (){
//   window.location.href = "../html/task234-taiben.html";
// }
//获取玩家人数
var num = sessionStorage.getItem("key1"); 
//获取玩家身份
var text = sessionStorage.getItem("key2");
//将玩家身份还原为对象(数组 )
var text1 = JSON.parse(text);
console.log(text1);
//法官查看身份页面,展示所有身份
var box = Array(num);
for(i=0;i<num;i++){
  box[i] =
  "<div class='box-content'>"+
    "<div class='box-name'>" + text1[i] + "</div>"+
    "<div class='box-number'>" + (i+1) +"号</div>"+
    "<img src='../images/031.png' class='tag'>"+
  "</div>";
}
document.getElementById('box').innerHTML=box.join("")
console.log(box);

// var index = $(".box-name").index(this);
// alert(index);

$('.box-name').click(function(){
  var index = $(".box-name").index(this);
  if (text1[index]=="平民"){
    //先重置背景颜色
    $('.box-name').css("background","#f5c97b");
    //再指定当前点击的div的背景颜色
    $(this).css("background","#999999");
    //本地存储/存入变量/选取被杀死的平民编号
    sessionStorage.setItem("key3", index+1);
    console.log(index+1);
  }else{
    alert("不能搞自己人啊!");
  }
})
//别挡道
})