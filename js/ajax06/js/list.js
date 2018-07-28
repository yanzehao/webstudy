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
    $scope.dt1         = $stateParams.startAt;
    $scope.dt2         = $stateParams.endAt;
    $scope.a           = $stateParams.status;
    $scope.b           = $stateParams.type;
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

    $state.go ("dashboard.list",{
      title   :$scope.title,
      author  :$scope.author,
      startAt :$scope.dt1,
      endAt   :$scope.dt2,
      status  :$scope.a,
      type    :$scope.b,
    },{
      reload:true
    })
  }

  // 清除按钮
  $scope.empty = function() {
    $state.go ("dashboard.list",{
      title       :undefined,
      author      :undefined,
      startAt     :undefined,
      endAt       :undefined,
      status      :undefined,
      type        :undefined,
      page        :1
    },{
      reload:true
    })
  }

  // 新增页
  $scope.add = function() {
    $state.go ("dashboard.detail");
  }

  //日期选择器
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt1 = null;
    $scope.dt2 = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };


  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt1 = new Date(year, month, day);
    $scope.dt2 = new Date(year, month, day);
  };

  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
})