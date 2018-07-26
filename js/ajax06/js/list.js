// 列表页控制器
app.controller("listctrl", function ($scope, $http, $state,$log,$stateParams,) {

  // 请求数据
  $http({
    method: 'get',
    url: '/carrots-admin-ajax/a/article/search',
    //params属性将输入框的值以键值对的形式传给服务器
    params: {
      page:     $stateParams.page,
      size:     $stateParams.size,
      title:    $stateParams.title,
      author:   $stateParams.author,
      startAt:  $stateParams.startAt,
      endAt:    $stateParams.endAt,
      status:   $stateParams.status,
      type:     $stateParams.type,
    },
  }).then(function (xhr) {
    console.log(xhr);
    $scope.title       = $stateParams.title;
    $scope.author      = $stateParams.author;
    $scope.startAt     = $stateParams.startAt;
    $scope.endAt       = $stateParams.endAt;
    $scope.status      = $stateParams.status;
    $scope.type        = $stateParams.type;
    $scope.currentPage = $stateParams.page;
    $scope.size        = $stateParams.size;
    $scope.total       = xhr.data.data.total;
    $scope.records     = xhr.data.data.articleList;
    $scope.maxSize     = 5;

  })

  //点击分页获取page数据
  $scope.pagechange = function () {
    console.log($scope.currentPage);
    $state.go ("dashboard.list",{
      page:$scope.currentPage
    },{
      //从服务器端重新载入
      reload:true
    })
  }

  //分页相关输入框指定数据进行搜索
  $scope.sizego = function () {
    $state.go ("dashboard.list",{
      size:$scope.size,
      page:$scope.pagego
    },{
      //从服务器端重新载入
      reload:true
    })
  }

  //头部按条件搜索
  $scope.search = function() {
    console.log($scope.title);
    $state.go ("dashboard.list",{
      title   :$scope.title,
      author  :$scope.author,
      startAt :$scope.startAt,
      endAt   :$scope.endAt,
      status  :$scope.status,
      type    :$scope.type,
    },{
      reload:true
    })
  }
  $scope.nbg = 1;
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







