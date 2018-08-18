
app.controller("loginctrl", function ($scope, $http, $state) {
  // console.log("%c 哔哩哔哩干杯组", "color:blue;font-size:60px");
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
      sessionStorage.setItem('loginSuccess',xhr.data.code)
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