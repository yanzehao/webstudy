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
console.log(num);
console.log(text1);


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
      
    },
    onStep2: function () {
      
    },
    onStep3: function () {
      
    },
    onStep4: function () {
      
    },
    onAfterStep4: function () {//在
      //清除当前的本地存储信息
      // sessionStorage.removeItem("gameother");
      // sessionStorage.removeItem("game");
      //重新加载当前文档
      window.location.reload();
    }
  }
})

//获取当前节点的序号
var i = $(".talk>p").index($(this));
//为"杀手杀人"添加点击事件
$(".talk>p").eq(0).click(function () {

  fsm.step1();//转换到"杀手杀人"状态的方法
  var r=confirm("进入杀人环节！");
  if (r==true){
    $(".talk>p").eq(0).addClass("talkp");
    $(".trans").eq(0).addClass("talka");
    // window.location.href = "../html/task234-02.html";
  }
  // window.location.href = "../html/task234-02.html";
  // window.sessionStorage.setItem('game', '1');
  // window.sessionStorage.getItem('gameother');
});
//为"亡灵发表遗言"添加点击事件
$(".talk>p").eq(1).click(function () {
  if (fsm.is(2) == true){
    alert("请进行下一步游戏");
  }
  if (fsm.is(1) == false){
    alert("请按顺序游戏");
  };
  fsm.step2();//转换到"亡灵发表遗言"状态的方法
  // window.sessionStorage.setItem('game', "2");
  // window.sessionStorage.setItem('gameother', "2");
  var r=confirm("亡灵发表遗言！");
  if (r==true){
    $(".talk>p").eq(1).addClass('talkp');
    $(".trans").eq(1).addClass('talka');
  };
})
// $(".talk>p").eq(1).click(function () {
//   if (fsm.is(1) == false){
//     alert("请按顺序游戏");
//   };
// })
//为"玩家发言"添加点击事件
$(".talk>p").eq(2).click(function () {
  fsm.step3();//转换到"玩家发言"状态的方法
  // window.sessionStorage.setItem('game', "3");
  // window.sessionStorage.setItem('gameother', "3");
  var r=confirm("玩家依次发言！");
  if (r==true){
    $(".talk>p").eq(2).addClass('talkp');
  }
})
//为"玩家投票"添加点击事件
$(".talk>p").eq(3).click(function () {
  fsm.step4();//转换到"玩家投票"状态的方法
  // window.sessionStorage.setItem('game', "4");
  var r=confirm("进入投票环节！");
  if (r==true){
    $(".talk>p").eq(3).addClass('talkp');
  }
  // window.location.href = "../html/task234-02.html";
})


// 判断流程状态，存储状态并在跳转页面之后返回另一个值实现    
// var gameother = window.sessionStorage.getItem("gameother");
// console.log(gameother);
// if (gameother == "1") {
//   fsm.step1();
// } else if (gameother == "2") {
//   fsm.step1();
//   fsm.step2();
// } else if (gameother == "3") {
//   fsm.step1();
//   fsm.step2();
//   fsm.step3();
// } else if (gameother == "4") {
//   fsm.step1();
//   fsm.step2();
//   fsm.step3();
//   fsm.step4();
// } else {
//   fsm.reset();
// }

//别挡道
})
