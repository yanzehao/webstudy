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
  sessionStorage.setItem("pnum",index);
  console.log("当前玩家索引:"+index);
  if (text1[index]=="杀手"){
    alert("不能搞自己人啊!");
  }
  else if(text1[index]=="平民"){
    //先重置背景颜色
    $('.box-name').css("background","#f5c97b");
    //再指定当前点击的div的背景颜色
    $(this).css("background","#999999");
    //本地存储/存入变量/选取被杀死的平民编号
    sessionStorage.setItem("key3", index+1);
    console.log('杀死平民:'+(index+1));
    //获取初始平民索引数组
    var pingstr=sessionStorage.getItem("ping");
    var ping = JSON.parse(pingstr);
    console.log(ping);
    //平民索引
    var x = $.inArray(index,ping);
    for(i=0;i<day;i++){
      //存活的平民
      var live = Array(ping.length-i)
      var live = ping;
      live.splice(x,1);
      console.log(live);
      //死亡平民
      var dead1 = [];
      dead1.push(index);
      console.log(dead1);
      console.log(dead1.length);

    }

    //玩家数组乱序输出
    // for (var i=0;i<txt2.value;i++){
    //   var all = i + Math.floor( Math.random()*(txt2.value - i));
    //   var temp = allplayer[i];
    //   allplayer[i]=allplayer[all];
    //   allplayer[all] = temp;
    //   allplayerText[all] = tempText;
    // }

    // function shuffle(arr) {
    //   var i, j, temp;
    //   for (i = arr.length - 1; i > 0; i--) {
    //       j = Math.floor(Math.random() * (i + 1));
    //       temp = arr[i];
    //       arr[i] = arr[j];
    //       arr[j] = temp;
    //   }
    //   return arr;
    // };

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