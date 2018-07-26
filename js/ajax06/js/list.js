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



// //释义服务器返回的字段（status类型）
// app.filter("statuscode",function () {
//   return function (statuscode) {
//     var changed = "";
//     switch (statuscode){
//       case "草稿":changed = 1; break;
//       case "上线":changed = 2; break;
//     }
//     return changed;
//   }
// })

// 列表页控制器
app.controller("listctrl", function ($scope, $http, $state,$log,$stateParams,) {
  // if($scope.status=="草稿"){
  //   $stateParams.status = 1;
  //   $stateParams.type = 2;
  // }

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
      status:   $stateParams.a,
      type:     $stateParams.b,
    },
  }).then(function (xhr) {
    console.log(xhr);
    console.log($scope.a_status);
    $scope.title       = $stateParams.title;
    $scope.author      = $stateParams.author;
    $scope.startAt     = $stateParams.startAt;
    $scope.endAt       = $stateParams.endAt;
    $scope.a      = $stateParams.a;
    $scope.b        = $stateParams.b;
    $scope.currentPage = $stateParams.page;
    $scope.size        = xhr.data.data.size;
    $scope.total       = xhr.data.data.total;
    $scope.records     = xhr.data.data.articleList;
    $scope.maxSize     = 5;
    
    //选择状态
    $scope.a_status = [
      {status: "1",draft: "草稿"},
      {status: "2",draft: "上线"}
    ]

    //选择类型
    $scope.b_type = [
      {type: "0", online: "首页banner"},
      {type: "1", online: "找职位banner"},
      {type: "2", online: "找精英banner"},
      {type: "3", online: "行业大图"}
    ]
  })

  //点击分页获取page数据
  $scope.pagechange = function () {
    console.log($scope.currentPage);
    $state.go ("dashboard.list",{
      page:$scope.currentPage
    },{
      reload:true
    })
  }

  //分页相关输入框指定数据进行搜索
  $scope.sizego = function () {
    $state.go ("dashboard.list",{
      size:$scope.size,
      page:$scope.pagego
    },{
      reload:true
    })
  }


  //头部按条件搜索
  $scope.search = function() {

    console.log($scope.title);
    console.log($scope.a);
    $state.go ("dashboard.list",{
      title   :$scope.title,
      author  :$scope.author,
      startAt :$scope.startAt,
      endAt   :$scope.endAt,
      status  :$scope.a,
      type    :$scope.b,
    },{
      reload:true
    })
  }
  // // 清除按钮
  // $scope.clear = function() {
  //   console.log($scope.title);
  //   $state.go ("dashboard.list",{
  //     title   :undefined,
  //     author  :undefined,
  //     startAt :undefined,
  //     endAt   :undefined,
  //     status  :undefined,
  //     type    :undefined,
  //   },{
  //     reload:true
  //   })
  // }
})





// //释义服务器返回的字段（status类型）
// app.filter("statuscode",function () {
//   return function (statuscode) {
//     var changed = "";
//     switch (statuscode){
//       case "1":changed = "草稿"; break;
//       case "2":changed = "上线"; break;
//     }
//     return changed;
//   }
// })

//释义服务器返回的字段（status类型）
// app.filter("statuscode",function (status) {
//   return function (index) {
//     return draft[index]
//   }
// })
// app.constant('status',{
//   1:"草稿",
//   2:"上线"
// })
// app.constant('type',{
//   0:"首页banner",
//   1:"找职位banner",
//   2:"找精英banner",
//   3:"行业大图",
// })





