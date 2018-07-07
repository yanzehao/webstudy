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
//选取被杀死的平民编号
var killed = sessionStorage.getItem("key3");
console.log(killed);
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
//指定被杀玩家的默认状态(背景颜色为灰色)
$(".box-name").eq(killed-1).css("background","#999999");
//点击投票
$('.box-name').click(function(){
  //获取当前玩家的索引
  var index = $(".box-name").index(this);
  //本地存储/存入变量/选取被投票投死的玩家
  sessionStorage.setItem("key4", index+1);
  //先重置背景颜色
  $('.box-name').css("background","#f5c97b");
  //然后指定被杀玩家的默认状态(背景颜色为灰色)
  $(".box-name").eq(killed-1).css("background","#999999");
  //判断选取的玩家是否死亡
  if ( index == (killed-1)){
    alert("无法对已死亡玩家进行投票!")
  }
  else{
    //再指定当前点击的div的背景颜色
    $(this).css("background","#999999");
    console.log(index);
  }
})
//别挡道
})