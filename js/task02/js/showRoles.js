
//header部分左右按钮的点击功能
$(".header img").eq(0).click(function(){
	sessionStorage.clear();
	location.href="gameSet.html";
});
$(".header img").eq(1).click(function(){
	sessionStorage.clear();
	location.href="index.html";
});
//从sessionStorage中获取数据
all=JSON.parse(sessionStorage.getItem("all"));
console.log(all);
//定义变量存放点击按钮次数
var i =0; 
$(".footer").click(function(){
	i=i+1;
	if(i<(all.length)*2-1){
		if(i%2==0){ //点击次数为偶数时
			$(".index").html(Math.ceil((1/2)*(i+1)));
			$(".bg").html(null);	
			$(".bg").prepend('<img src="img/hidden.png" style="width: 68%;padding-top: 8rem">');
			$(".footer span").text("查看"+Math.ceil((1/2)*(i+2))+"号身份");
		}
		else{ //点击次数为奇数时
			$(".index").html(Math.ceil((1/2)*(i+1)));
			$(".bg").html(null);
			$(".bg").prepend('<img src="img/flop.png">');
			// $(".bg img").css({"width":"50%","padding-top":"13rem"});
			if(all[Math.ceil((1/2)*i)-1]==1){
				$(".bg img").after('<div style="padding-top: .5rem; font-size: 3rem; color: #29bde0">角色：杀手</div>');
			}
			else{
				$(".bg img").after('<div style="padding-top: .5rem; font-size: 3rem; color: #29bde0">角色：平民</div>');
			}
			$(".footer span").text("隐藏并传递给"+Math.ceil((1/2)*(i+2))+"号");
		}
	}
	else if(i==(all.length)*2-1){
		$(".index").html(Math.ceil((1/2)*(i+1)));
		$(".bg").html(null);
		$(".bg").prepend('<img src="img/flop.png">');
		if(all[Math.ceil((1/2)*i)-1]==1){
			$(".bg img").after('<div style="padding-top: .5rem; font-size: 3rem; color: #29bde0">角色：杀手</div>');
		}
		else{
			$(".bg img").after('<div style="padding-top: .5rem; font-size: 3rem; color: #29bde0">角色：平民</div>');
		}
		$(".footer span").text("法官查看");
	}
	// 点击次数超过游戏玩家人数时跳转
	else{ 
		location.href="infor.html"
	}
})

