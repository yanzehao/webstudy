//从sessionStorage中获取数据
all=JSON.parse(sessionStorage.getItem("all"));
console.log(all);
// 取到死亡的杀手数组，做判断的时候要用
diedKiller=JSON.parse(sessionStorage.getItem("diedKiller"));
// 创建被处决的杀手数组
if(diedKiller==null){
	var diedKiller=[];
	sessionStorage.setItem("diedKiller",JSON.stringify(diedKiller));
}

//渲染出标签
for (var i = 0; i < all.length; i++){
	var player='<div class="player"><div class="people"><div class="vocation"></div><div class="number"></div></div><div class="hover"><img src="img/knife.png"></div></div>'
	$(".main").prepend(player);
}
//给盒子加上对应玩家身份
for(var i=0;i<all.length;i++){
	$(".number").eq(i).text(i+1);
	if (all[i]==1){
		$(".vocation").eq(i).text("杀手");
	} 
	else{
		$(".vocation").eq(i).text("平民");
	}
}

// 获取选择的玩家身份和序号
var role; 
// 对死者渲染样式
died=JSON.parse(sessionStorage.getItem("died"));
console.log(died);
if(died!=null){
	for(i=0;i<died.length;i++){
		$(".people").eq(died[i]-1).css("opacity","0.5");
	};	
};
$(".people").mouseenter(function (){
	number=$(this).find(".number").text();
	console.log(number);
	role=$(this).find(".vocation").text();
	console.log(role);	

})
//点击bottom按钮功能
$(".footer").click(function(){
	console.log(role);
	if(role=="杀手"){
		died=JSON.parse(sessionStorage.getItem("died"));
		if(died.indexOf(number)!=-1){
			alert("得饶人处且饶人,请放过死者!");		
		}
		else{
			alert("请不要自相残杀!")
		}
	}
	if(role=="平民"){
		var died=JSON.parse(sessionStorage.getItem("died"));
		console.log(died);
		if(died==null){
			died=[];
			died.push(number);
			console.log(died);
			sessionStorage.setItem("died",JSON.stringify(died));
			window.location.href="game.html";
		}
		else{
			if(died.indexOf(number)!=-1){
				alert("得饶人处且饶人,请放过死者!");		
			}
			else{
				died.push(number);
				console.log(died);
				sessionStorage.setItem("died",JSON.stringify(died));
				window.location.href="game.html";
			}
			if((Math.floor((1/3)*all.length)-diedKiller.length)==0||(Math.floor((1/3)*all.length)-diedKiller.length)==(all.length - (Math.floor((1/3)*all.length))-(died.length-diedKiller.length)) ){
				window.location.href="result.html";
			}
		}
	}
	if(role==undefined){
		alert("请选择你要杀死的玩家!");
	}
})
