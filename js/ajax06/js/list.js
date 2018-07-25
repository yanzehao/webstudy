// 列表页控制器
app.controller("listctrl", function ($scope, $http, $state,$log,$stateParams,) {

  // 请求数据
  $http({
    method: 'get',
    url: '/carrots-admin-ajax/a/article/search',
    //params属性将输入框的值以键值对的形式传给服务器
    params: {
      page: $stateParams.page,
      size: $stateParams.size,
    },
  }).then(function (xhr) {
    console.log(xhr);
    $scope.records = xhr.data.data.articleList;
    $scope.currentPage = $stateParams.page;
    // 分页设置
    //单页显示数量
    $scope.size = xhr.data.data.size;
    console.log($scope.size);
    //数据总量
    $scope.total = xhr.data.data.total;
    console.log($scope.total);
    //当前页面数据
    $log.log("xhr.data.data.page")
    //单页最大显示数量
    $scope.maxSize = 5;

    // $http({
    //   method: 'post',
    //   url: '/carrots-admin-ajax/a/login',
    //   //params属性将输入框的值以键值对的形式传给服务器
    //   params: {
    //     name: $scope.name,  
    //     pwd: $scope.pass,
    //   },
    //   //编码格式
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    // }).then(function (xhr) {
    //   console.log(xhr.data);
    //   if (xhr.data.code === 0) {
    //     $state.go("dashboard");
    //   } else {
    //     $scope.info = xhr.data.message;
    //   }
    // })

  })
  $scope.pagesclick = function () {
    $state.go ("dashboard.list",{
      page:$scope.currentPage
    },{
      reload:true
    })
  }
})

 
//释义服务器返回的字段（type类型）
app.filter("Changetype",function () {
  return function (inputtype) {
    var changed = "";
    switch (inputtype){
      case 0:changed = "首页banner";    break;
      case 1:changed = "找职位banner";  break;
      case 2:changed = "找精英banner";  break;
      case 3:changed = "行业大图";      break;
    }
    return changed;
  }
})

//释义服务器返回的字段（status类型）
app.filter("statu",function () {
  return function (inputData) {
    var changed = "";
    switch (inputData){
      case 1:changed = "草稿"; break;
      case 2:changed = "上线"; break;
    }
    return changed;
  }
})





