
app.controller("loginctrl", function ($scope, $http, $state) {
  $scope.subclick = function () {
    $http({
      method: 'post',
      url: '/carrots-admin-ajax/a/login',
      //params属性将输入框的值以键值对的形式传给服务器
      params: {
        name: $scope.name,  
        pwd: $scope.pass,
      },
      responseType: "json",
      //编码格式
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(function (xhr) {
      console.log(xhr.data);
      if (xhr.data.code === 0) {
        $state.go("dashboard");
      } else {
        $scope.infor = true
        $scope.info = xhr.data.message;
      }
    })
  }
  $scope.unameChange = false;
  
})


//  //文档就绪事件
//  $(function(){
//    $("button").click(function(){
//      //获取用户输入的用户名和密码
//      var name = $("input").eq(0).val();
//      var pass = $("input").eq(1).val();
//      console.log(name);
//      console.log(pass);

//      //使用正则表达式进行表单验证
//      //验证用户名:4~16个字符，可使用字母、数字、下划线，需以字母开头
//      var reguser = /\w{4,16}/;  
//      //验证密码:6-18个字符,字母和数字的组合,不区分大小写    
//      var regpass = /^[A-Za-z0-9]{6,18}$/;   
//      //判断输入内容是否为空    
//      if(name === ""){    
//        $("#pro").html("用户名不能为空");
//      } 
//      else if(!reguser.test(name)){
//        $("#pro").html("用户名不符合要求");
//      }
//      else if(!regpass.test(pass)){
//        $("#pro").html("密码不符合要求");
//      }
//      else{
//        //创建XMLHttpRequest对象
//        var xhr = new XMLHttpRequest();
//        //打开XMLHttpRequest对象并规定请求的类型/地址/异步
//        xhr.open("post",'/carrots-admin-ajax/a/login/',true);
//        //如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头
//        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//        //发送XMLHttpRequest对象给服务器
//        xhr.send("name=" + name + "&pwd=" + pass );
//        //每当 readyState 属性改变时，就会调用该函数
//        xhr.onreadystatechange=function(){
//          //判断:请求完成且响应就绪
//          if (xhr.readyState==4 && xhr.status==200){
//            //服务器返回的是json格式的字符串
//            console.log(xhr.responseText);
//            //将json字符串转换为对象
//            var jsonobj = JSON.parse(xhr.responseText)
//            console.log(jsonobj);
//            //当用户名和密码都OK时,跳转到后台页面
//            if (jsonobj.message == "success"){
//             window.location.href="./html/dashboard.html";

//            }
//            else{
//              $("#pro").html(jsonobj.message);
//            }
//          }
//        }

//        // //jquery ajax 异步请求
//        // $.post("/carrots-admin-ajax/a/login/",
//        // {
//        //   name:name,
//        //   pwd:pass
//        // },
//        // function(data,status){
//        //   var jsonobj = JSON.parse(data)
//        //   console.log(jsonobj);
//        //   //当用户名和密码都OK时,跳转到后台页面
//        //   if (jsonobj.message == "success"){
//        //     window.location.href="http://dev.admin.carrots.ptteng.com/#/dashboard";
//        //   }
//        //   else{
//        //     $("#pro").html(jsonobj.message);
//        //   }
//        // }
//      }   
//    });
//  })





