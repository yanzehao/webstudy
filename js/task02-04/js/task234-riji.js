$(function(){
//跳转至玩家配比页面
$("header img:first").click(function(){
    window.location.href = "../html/task234-watch.html";
});
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
//跳转至法官台本页面
document.getElementsByTagName('footer')[0].onclick=function (){
  window.location.href = "../html/task234-taiben.html";
}
//获取玩家人数
var num = sessionStorage.getItem("key1"); 
//获取玩家身份
var text = sessionStorage.getItem("key2");
//将玩家身份还原为对象(数组 )
var text1 = JSON.parse(text);
console.log(text1);
//获取被杀手杀死的平民编号
var killed = sessionStorage.getItem("key3");
console.log(killed);
//获取被玩家投票投死的玩家索引
var tousi = sessionStorage.getItem("key4");
console.log(tousi);

//法官查看身份页面,展示所有身份
var box = Array(num);
for(i=0;i<num;i++){
  box[i] =
  "<div class='box-content'>"+
    "<div class='box-name'>" + text1[i] + "</div>"+
    "<div class='box-number'>" + (i+1) +"号</div>"+
    "<img src='../images/03.png' class='tag'>"+
  "</div>";
}
document.getElementById('box').innerHTML=box.join("")
console.log(box);

//被杀手杀死的平民玩家
$(".box-name").eq(killed-1).css("background","#999999");
//被投票致死的幸运玩家
$(".box-name").eq(tousi-1).css("background","#999999");

//别挡道
})
