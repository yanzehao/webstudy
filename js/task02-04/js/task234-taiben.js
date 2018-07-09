//js文档就绪事件
$(function(){
//返回至法官日记页面
$("header img:first").click(function(){
  window.location.href = "../html/task234-riji.html";
});
//结束游戏进行确认并清除数据
$("header>img:last,footer>button:first").click(function(){
  var r=confirm("结束本轮游戏吗?");
  if (r==true){
    //清除所有数据
    sessionStorage.clear();
    window.location.href = "../html/task234-01.html";
  }
});
//法官日志查看按钮
$('footer button:last').click(function(){
  window.location.href = '../html/task234-riji.html'
})
//获取玩家人数
var num = sessionStorage.getItem("key1"); 
//获取玩家身份
var text = sessionStorage.getItem("key2");
//将玩家身份还原为对象(数组 )
var text1 = JSON.parse(text);
//获取被杀死的平民编号
var killed = sessionStorage.getItem("key3");
// 获取被投死的玩家编号
var player = sessionStorage.getItem("key4")
console.log(text1 );
console.log('被杀平民:'+killed);
console.log('投死玩家:'+player);
//获取游戏天数,赋值给变量day的是一个空对象指针(只有关键字,没有具体的值)
var day = sessionStorage.getItem("someday")
console.log('游戏天数:'+day);//返回值为 "null"
if(day == null){ //初始天数为1
  var day=1;
  sessionStorage.setItem("someday",day);
}
//定义杀手索引数组
var sha = [];
//定义平民索引数组
var ping = [];
for(i=0;i<num;i++){
  if(text1[i]=="杀手"){
    sha.push(i)
  }
  else if (text1[i]=="平民"){
    ping.push(i)
  }
}
console.log("杀手索引:"+sha);
console.log("平民索引:"+ping);

//将杀手数组转换为字符串类型
var shastr =JSON.stringify(sha);
//将杀手数组以字符串的形式进行本地存储
sessionStorage.setItem("sha",shastr);
//将平民数组转换为字符串类型
var pingstr =JSON.stringify(ping);
//将平民数组以字符串的形式进行本地存储
sessionStorage.setItem("ping",pingstr);

var pnum = sessionStorage.getItem("pnum")
for (i=0;i<ping.length;i++){
  if(pnum==ping[i]){
    
  }
  // //删除平民玩家索引数组中的索引元素
  // ping.splice($.inArray(index,ping),1);
  // console.log(ping);
  // console.log(ping.length);
}

//--------------------------------------


//sdasd
//有限状态机,包含每天的四个步骤的状态
var fsm = new StateMachine({//创建有限状态机(关键词new,表示的是一个构造函数,初始化这个状态机)
  // 设置初始状态
  init: '0',
  //绑定事件触发状态,如下有五个事件,分别是一天的四个步骤,最后是重置当前的状态
  transitions: [
   { name: 'step1', from: '0',  to: '1' },//第一天:杀手杀人
   { name: 'step2', from: '1',  to: '2' },//第二天:亡灵发表遗言
   { name: 'step3', from: '2',  to: '3' },//第三天:玩家依次发言
   { name: 'step4', from: '3',  to: '4' },//第四天:全民投票
   { name: 'reset', from: '4',  to: '0' },//状态重置
  ],
  // 每个事件对应的方法
  methods: {
    onStep1: function () {
      $(".taiben").eq(4*day-4).addClass('talkp');
      $(".trans").eq(4*day-4).addClass('talka');
      $(".taiben").eq(4*day-4).after('<span>' + killed + '号被杀手杀死，他的身份是' + text1[killed-1] + '</span>');
      window.sessionStorage.setItem('game', fsm.state);
    },
    onStep2: function () {
      $(".taiben").eq(4*day-3).addClass('talkp');
      $(".trans").eq(4*day-3).addClass('talka');
      window.sessionStorage.setItem('game', fsm.state);
    },
    onStep3: function () {
      $(".taiben").eq(4*day-2).addClass('talkp');
      window.sessionStorage.setItem('game', fsm.state);
    },
    onStep4: function () {
      $(".taiben").eq(4*day-1).addClass('talkp');
      window.sessionStorage.setItem('game', fsm.state);
    },
  },
});

for (i = 0; i <day; i++) {
  $("main").append(
    '<p>第' + (i+1) +'天</p>' +
    '<span class="thisday"></span>' +
    '<div class="content">' +
      '<div class="talk">' +
        '<p class="taiben"><img src="../images/17.png" class="icon"><span class="trans"></span>杀手杀人</p>' +
        '<p class="taiben"><img src="../images/18.png" class="icon"> <span class="trans"></span>亡灵发表遗言</p>' +
        '<p class="taiben">玩家依次发言</p>' +
        '<p class="taiben">全民投票</p>' +
      '</div>' +
    '</div>'
  )
}
//为"亡灵发表遗言"添加点击事件
$(".taiben").eq(4*day-4).click(function () {
  fsm.step1();//转换到"杀手杀人"状态的方法
  alert("进入杀人环节！");
  window.location.href = "../html/task234-02.html";
});
//为"亡灵发表遗言"添加点击事件
$(".taiben").eq(4*day-3).click(function () {
  fsm.step2();//转换到"亡灵发表遗言"状态的方法
  alert("亡灵发表遗言！");
})
//为"玩家发言"添加点击事件
$(".taiben").eq(4*day-2).click(function () {
  fsm.step3();//转换到"玩家发言"状态的方法
  alert("玩家依次发言！");
})
//为"玩家投票"添加点击事件
$(".taiben").eq(4*day-1).click(function () {
  fsm.step4();//转换到"玩家投票"状态的方法
  alert("进入投票环节！");
  window.location.href = "../html/task234-021.html";
  var day = sessionStorage.getItem("someday");
  day++;
  console.log(day);
  sessionStorage.setItem("someday", day);
})
// //存活平民玩家
// for(i=0;i<day;i++){
//   ping.splice($.inArray(killed-1,ping),1);
// }
// console.log("存活平民玩家:"+ping);
//游戏天数按钮控制对应的法官台本显示和隐藏
$("main>p").click(function(){
  var x = $("main>p").index(this);
  $(".content").eq(x).toggle(200);
});
//使进入杀人页面或投票页面返回后，已过的天数过程隐藏起来。
if (day > 1) { 
  for (var i = 0; i < (day - 1); i++){
    $(".content").eq(i).toggle();
  }
}
//已完成的天数,台本背景变灰
for (var i = 0; i < (day-1); i++){
  $(".taiben").eq(4*i).addClass('talkp');
  $(".trans" ).eq(4*i).addClass('talka');
  $(".taiben").eq(4*i+1).addClass('talkp');
  $(".trans" ).eq(4*i+1).addClass('talka');
  $(".taiben").eq(4*i+2).addClass('talkp');
  $(".taiben").eq(4*i+3).addClass('talkp');
  $(".taiben").eq(4*i).after('<span>' + killed + '号被杀手杀死，他的身份是' + text1[killed-1] + '</span>');
  $(".taiben").eq(4*i+3).after('<span>' + [player] + '号被投票投死，他的身份是' + text1[player-1] + '</span>');
}

//判断流程状态，存储状态并在跳转页面之后返回另一个值实现
var game = window.sessionStorage.getItem("game");
if (game == "1") {
  fsm.step1();
} else if (game == "2") {
  fsm.step1();
  fsm.step2();
} else if (game == "3") {
  fsm.step1();
  fsm.step2();
  fsm.step3();
} 
//别挡道
})
