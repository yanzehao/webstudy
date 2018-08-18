//释义服务器返回的字段（type类型）
app.filter("typeChange",function () {
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
app.filter("statuChange",function () {
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
app.controller("listctrl", function ($scope, $http, $state, $stateParams, $ocLazyLoad) {
  $ocLazyLoad.load('list.js');
  //选择状态
  $scope.statusAll = [
    {id: "1",label: "草稿"},
    {id: "2",label: "上线"}
  ]
  
  //选择类型
  $scope.typeAll = [
    {id: "0", label: "首页banner"},
    {id: "1", label: "找职位banner"},
    {id: "2", label: "找精英banner"},
    {id: "3", label: "行业大图"}
  ]

  // 搜索数据
  console.log($stateParams);
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
    responseType: "json"
  }).then(function (xhr) {
    console.log(xhr);
    $scope.title       = $stateParams.title;
    $scope.author      = $stateParams.author;

    $scope.startAt     = parseInt($stateParams.startAt);
    $scope.endAt       = parseInt($stateParams.endAt);

    $scope.status      = $stateParams.status;
    $scope.type        = $stateParams.type;

    $scope.currentPage = $stateParams.page;
    $scope.page        = $stateParams.page;

    $scope.size        = xhr.data.data.size;
    $scope.total       = xhr.data.data.total;
    $scope.lists       = xhr.data.data.articleList;

    $scope.maxSize     = 5;

    if($scope.lists.length==0){
      $('#backResult').text('暂无数据')
    }
  })

  //编辑
  $scope.goedit = function(id){
    var id = this.list.id
    console.log(id);
    $state.go("dashboard.detail",{
      "id": id
    })
  }
  
  //上下线文字渲染
  $scope.online = function(){
    if(this.list.status === 1){
      return "上线"
    }
    else {
      return "下线"
    }
  }

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
      page:$scope.page
    },{
      reload:true
    })
  }

  //点击搜索按钮
  $scope.search = function() {
    //日期格式改为时间戳(毫秒数)
    var time_dt1,date1, time_dt2,date2;
    if ($scope.startAt) {
      date1 = new Date($scope.startAt);
      console.log(date1);
      
      time_dt1 = date1.valueOf();
      console.log("创建时间" + time_dt1);
    }
    if ($scope.endAt) {
      date2 = new Date($scope.endAt);
      // 时间间隔为0时特意增加一天的间隔
      if (time_dt1 !== date2.valueOf()) {
        time_dt2 = date2.valueOf();
      } 
      else {
        time_dt2 = date1.valueOf() + 86399000;
      }
      console.log(time_dt2);
    }

    // 点击按钮同时传参
    $state.go ("dashboard.list",{
      title   :$scope.title,
      author  :$scope.author,
      startAt :time_dt1,
      endAt   :time_dt2,
      status  :$scope.status,
      type    :$scope.type,
    },{
      reload:true,
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
      reload:true,
    })
  }

  // 新增页
  $scope.add = function() {
    $state.go ("dashboard.detail")
  }


  //点击事件改变上下线的状态
  $scope.goline = function (id) {
    var id = this.list.id;
    // 草稿改上线
    if (this.list.status === 1) {
      bootbox.confirm({
        closeButton: false,
        title: "<p class='text-info'>操作提示</p>",
        message: "<p style='text-align: center;color: #999999'>上线后该图片将在轮播banner中展示。</p> <br> <h4 class='text-danger' style='text-align: center'>是否执行上线操作</h4>",
        buttons: {
          cancel: {
            label: '取消'
          },
          confirm: {
            label: '确认'
          }
        },
        callback: function (result) {
          if(result){
            $http({
              method: 'put',
              url: '/carrots-admin-ajax/a/u/article/status',
              params: {
                id: id,
                status: 2
              }
            }).then(function () {
              $state.go($state.current, {}, {
                reload: true
              })
            })
          }
        }
      })
    }
    // 上线改草稿 
    else{
      bootbox.confirm({
        closeButton: false,
        title: "<p class='text-info'>操作提示</p>",
        message: "<p style='text-align: center;color: #999999'>下线后该图片将不展示在轮播banner中。</p> <br> <h4 class='text-danger' style='text-align: center'>是否执行下线操作</h4>",
        buttons: {
          cancel: {
            label: '取消'
          },
          confirm: {
            label: '确认'
          }
        },
        callback: function (result) {
          if(result){
            $http({
              method: 'put',
              url: '/carrots-admin-ajax/a/u/article/status',
              params: {
                id: id,
                status: 1
              }
            }).then(function () {
              $state.go($state.current, {}, {
                reload: true
              })
            })
          }
        }
      })
    }
  }



  //删除按钮确认框
  $scope.delete = function(){
    var id = this.list.id
    bootbox.confirm({
      closeButton: false,
      title: "<p class='text-info'>操作提示</p>",
      message: "<p class='text-info' style='text-align: center'>删除后该Articler图将直接下架并在本地删除</p> <br> <h4 class='text-danger' style='text-align: center'>你确定要执行删除操作吗?</h4>",
      buttons: {
        cancel: {
          label: '取消'
        },
        confirm: {
          label: '确认'
        }
      },
      callback: function (result) {
        // console.log('This was logged in the callback: ' + result);
        if(result){
          $http({
            method: 'delete',
            url: '/carrots-admin-ajax/a/u/article/' + id,
          }).then(function (res) {
            console.log(res);
            $state.go($state.current, {}, {
              reload: true
            })
          })
        }
      }
    });
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



