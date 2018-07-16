//文档就绪事件
$(function(){
  $("a").click(function(){
    var name = $("input").eq(0);
    console.log(name.value);
  });
})