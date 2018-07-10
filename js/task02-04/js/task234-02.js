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
    console.log("平民索引数组"+ping);
    for(i=0;i<day;i++){
      if(day=1){
        //死亡平民
        dead=[];
        dead.push(index);
        console.log("死亡平民:"+dead);
        sessionStorage.setItem("ondead",dead)
        //存活的平民
        ping.splice($.inArray(index,ping),1);
        console.log("存活平民:"+ping);
        sessionStorage.setItem("onping",ping)
      }
      else{

      }
    }
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