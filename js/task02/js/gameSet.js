var playerNum = document.getElementById("player");
var rangeNum = document.getElementById("range");

var btnLess = document.getElementById("btnSub");
var btnPlus = document.getElementById("btnAdd");
//header部分左右按钮的点击功能
$(".header img").eq(0).click(function(){
	location.href="index.html";
});
// 滑块部分 

// $("#range").bind("input", function(e){
//     $("#range").attr('value', this.value);
// 	$("#range").css( 'background-size', (this.value)*0.7 + '0% 100%' ); 
// });

function inputChange(){
	if (playerNum.value >=4 && playerNum.value <=18) {
		rangeNum.value = playerNum.value;
	}
	else {
		alert("请输入正确人数(4~18人)");
		playerNum.value = 8;
		rangeNum.value = 8;
	}
}
function moveChange(){
	playerNum.value = rangeNum.value;
}
function less(){
	rangeNum.value--;
	if (rangeNum.value<4) {
		alert("玩家人数不能再少啦!")
	} 
	else {
		playerNum.value = rangeNum.value;
	}
}
function add(){
	rangeNum.value++;
	if (rangeNum.value>18) {
		alert("玩家人数已经满啦!")
	} 
	else {
		playerNum.value = rangeNum.value;
	}
}

var ul = document.getElementById("list");
// 构造玩家数组
var all=[];
function getPlayer(){
	for(var i=0;i<playerNum.value;i++){
		if(i<Math.floor((1/3)*playerNum.value)){
			all.push(1);
		}
		else {
			all.push(0);
		}
	}
console.log(all);
}
//打乱人数
function shuffle(all){
	for (var i=playerNum.value-1,s,t; i>0; i--){
		s= Math.floor(Math.random()*i);
		t=all[i];
		all[i]=all[s];
		all[s]=t;
		}
	return all;
}
// 渲染出li样式
function getLi(){
	for (var i=0;i<playerNum.value;i++) {
		var li = document.createElement("li");
		ul.appendChild(li);
		if(all[i]==1){
			li.innerHTML = "杀手 1 人";
			li.style.color = "#fab344";
		}
		else{
			li.innerHTML = "平民 1 人";
			li.style.color = "#29bde0";
		}
	}
}
// 点击事件
function getRole(){
	all=[];
	getPlayer(); //获取玩家人数
	ul.innerHTML = "";  //还原样式设置；
	shuffle(all);
	getLi();
	console.log(all);
	sessionStorage.setItem ("all",JSON.stringify(all));// 把数据存在sessionStorage上；
	// sessionStorage.all = JSON.stringify(all);
}
//点击发牌，跳转页面
$(".card").click(function(){
	console.log(all===[]);
	if(all.length==0){
		alert("请正确设置游戏参数！")
	}
	else {
		location.href="showRoles.html"
	}
})
//回退到首页
function backHome(){
	sessionStorage.clear();
	window.location.href="index.html";
} 