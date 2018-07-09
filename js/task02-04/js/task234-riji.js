$(function(){
//跳转至玩家配比页面
$("header img:first").click(function(){
    window.location.href = "../html/task234-watch.html";
});
//结束游戏确认框
$("header img:last").click(function(){
  var r=confirm("结束本轮游戏吗?");
  if (r==true){
    sessionStorage.clear();
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
console.log( "被杀死的平民:" + killed);
//获取被玩家投票投死的玩家索引
var tousi = sessionStorage.getItem("key4");
console.log(tousi);
//获取游戏天数
var day = sessionStorage.getItem("someday")
console.log("当前游戏天数"+day)

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

//获取杀手索引数组(字符串类型)
var shastr = sessionStorage.getItem("sha");
//还原杀手索引数组(对象类型)
var sha =  JSON.parse(shastr)
console.log(sha);

//获取平民索引数组(字符串类型)
var pingstr = sessionStorage.getItem("ping");
//还原平民索引数组(对象类型)
var ping =  JSON.parse(pingstr)
console.log(ping);
for(i=0;i<(day);i++){
  //当变量为空时,默认当0处理,需要规避这种事情
  if (killed==null){  
    $(".box-name:last").css("background","#f5c97b");
  }
  else{
    //被杀手杀死的平民玩家
    $(".box-name").eq(killed-1).css("background","#999999");
  }
  if (tousi==null){
    $(".box-name:last").css("background","#f5c97b");
  }
  else{
    //被投票致死的幸运玩家
    $(".box-name").eq(tousi-1).css("background","#999999");
  }
}
// 别挡道
})
