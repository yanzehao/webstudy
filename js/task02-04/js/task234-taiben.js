//js文档就绪事件
$(function(){
//返回至法官日记页面
$("header img:first").click(function(){
  window.location.href = "../html/task234-riji.html";
});
//结束游戏确认框
$("header img:last").click(function(){
  var r=confirm("结束本轮游戏吗?");
  if (r==true){
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
console.log(text1);
console.log(killed);
console.log(player);

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
      $(".talk>p").eq(0).addClass("talkp");
      $(".trans").eq(0).addClass("talka");
      $(".taiben").eq(0).after('<span>' + killed + '号被杀手杀死，他的身份是' + text1[killed-1] + '</span>');
      window.sessionStorage.setItem('game', '1');
      console.log('当前状态:'+fsm.state);
    },
    onStep2: function () {
      $(".talk>p").eq(1).addClass('talkp');
      $(".trans").eq(1).addClass('talka');
      window.sessionStorage.setItem('game', "2");
      console.log('当前状态:'+fsm.state);
    },
    onStep3: function () {
      $(".talk>p").eq(2).addClass('talkp');
      window.sessionStorage.setItem('game', "3");
      console.log('当前状态:'+fsm.state);
    },
    onStep4: function () {
      $(".talk>p").eq(3).addClass('talkp');
      $(".taiben").eq(3).after('<span>' + [player] + '号被投票投死，他的身份是' + text1[player-1] + '</span>');
      window.sessionStorage.setItem('game', "4");
      console.log('当前状态:'+fsm.state);
    },
    onAfterStep4: function () {//在
      console.log('当前状态:'+fsm.state);
      var ini = 1
      var jiajia = ++ini;
      console.log(jiajia);
      $(".content").eq(0).after('<p>' + '第' + jiajia + '天' + '</p>');
      $(".content").eq(0).hide();
      //清除当前的本地存储信息
      sessionStorage.removeItem("game");
      
      //重新加载当前文档
      // window.location.reload();
    },
  }
})
//为"杀手杀人"添加点击事件
$(".talk>p").eq(0).click(function () {
  fsm.step1();//转换到"杀手杀人"状态的方法
  alert("进入杀人环节！");
  window.location.href = "../html/task234-02.html";
});
//为"亡灵发表遗言"添加点击事件
$(".talk>p").eq(1).click(function () {
  fsm.step2();//转换到"亡灵发表遗言"状态的方法
  alert("亡灵发表遗言！");
})
//为"玩家发言"添加点击事件
$(".talk>p").eq(2).click(function () {
  fsm.step3();//转换到"玩家发言"状态的方法
  alert("玩家依次发言！");
})
//为"玩家投票"添加点击事件
$(".talk>p").eq(3).click(function () {
  fsm.step4();//转换到"玩家投票"状态的方法
  alert("进入投票环节！");
  window.location.href = "../html/task234-021.html";
})
//完成一天的游戏流程之后如何保存并进行下一天的游戏
$("main>p").eq(0).click(function(){
  $(".content").eq(0).toggle(200);
});
//判断流程状态，存储状态并在跳转页面之后返回另一个值实现    
var game = window.sessionStorage.getItem("game");
console.log(game);
if (game == "1") {
  fsm.step1();
} else if (game == "2") {
  fsm.step1();
  fsm.step2();
} else if (game == "3") {
  fsm.step1();
  fsm.step2();
  fsm.step3();
} else if (game == "4") {
  fsm.step1();
  fsm.step2();
  fsm.step3();
  fsm.step4();
} else {
  fsm.reset();
}

//别挡道
})
