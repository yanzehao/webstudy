$(function(){
//结束游戏确认框
$("header img:last").click(function(){
  var r=confirm("结束本轮游戏吗?");
  if (r==true){
    sessionStorage.clear();
    window.location.href = "../html/task234-01.html";
  }
});

//获取玩家人数
var num = sessionStorage.getItem("key1"); 
//获取玩家身份
var text = sessionStorage.getItem("key2");
//将玩家身份还原为对象(数组 )
var text1 = JSON.parse(text);
console.log(text1);
//获取游戏天数
var day = sessionStorage.getItem("someday")
console.log("游戏天数:"+day);

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

//点击玩家角色事件
$('.box-name').click(function(){
  //获取当前选中的玩家索引
  index = $(".box-name").index(this);
  console.log("当前玩家索引:"+index);
  if (text1[index]=="杀手"){
    alert("不能搞自己人啊!");
  }
  else if(text1[index]=="平民"){

    //本地存储/存入变量/选取被杀死的平民编号
    sessionStorage.setItem("key3", index+1);
    console.log('杀死平民:'+(index+1));
    //获取平民索引数组(初始))
    var pingstr=sessionStorage.getItem("ping");
    var ping = JSON.parse(pingstr);
    console.log(ping);
    for(var i=0;i<day;i++){
      //死亡平民数组
      var dead = [];
      dead.push(index);
      console.log(dead);
      //存活平民数组
      ping.splice(index,1);
      console.log(ping);
      //先重置背景颜色
      $('.box-name').eq(ping[]).css("background","#f5c97b");
      //再指定当前点击的div的背景颜色
      $(this).css("background","#999999");
    }
    // ping.splice($.inArray(index,ping),1);
    // console.log(ping);
    // console.log(ping.length);
    // if(ping.length==0){
    //   window.location.href = "../html/task234-03.html"

    // //删除平民玩家的索引
    // ping.splice(index,1)
    // console.log(ping);
    // //删除平民玩家索引数组中的索引元素
    // ping.splice($.inArray(index,ping),1);
    // console.log(ping);
  }
})
//确定游戏按钮
$("footer").click(function(){
  if(index == undefined){
    alert("请先带走一位平民!")
  }
  else{
    window.location.href = "../html/task234-taiben.html";
  }
});
//别挡道
})