app.controller('AccordionCtrl', function ($scope,$http,$state) {
  // 风琴菜单列表
  $scope.groups = [
    {
      title: '信息管理',
      open: false,
      content:[
        {list:'公司列表'},
        {list:'职位列表'},
      ]
    },
    {
      title: '内容管理',
      open: false,
      content:[
        {list:'Article管理',url:'dashboard.list'}
      ]
    },
    {
      title: '后台管理',
      open: false,
      content:[
        {list:'账号管理'},
        {list:'角色管理'},
        {list:'修改管理'},
        {list:'模块管理'},
      ]
    },
  ];
  console.log($scope.groups);

  // 注销登录
  $scope.logout = function(){
    $http({
      method: 'post',
      url: '/carrots-admin-ajax/a/logout',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        $state.go('login');
        sessionStorage.clear();
      }
    })
  }

  //未登录禁止访问
  var loginSuccess = JSON.parse(sessionStorage.getItem('loginSuccess'));
  if(loginSuccess!==0){
    $state.go ("login")
  }
  
  //设置点击次数,初始为0
  var x = JSON.parse(sessionStorage.getItem('xx')) + 1;
  var y = JSON.parse(sessionStorage.getItem('yy')) + 1;
  var z = JSON.parse(sessionStorage.getItem('zz')) + 1;
  //点击事件
  $scope.clickOpen = function(index) {
    if(index==0){
      var xx = x++;
      console.log('x点击中',xx);
      sessionStorage.setItem('xx', xx);
    }
    if(index==1){
      var yy = y++;
      console.log('y点击中',yy);
      sessionStorage.setItem('yy', yy);
    }
    if(index==2){
      var zz = z++;
      console.log('z点击中',zz);
      sessionStorage.setItem('zz', zz);
    }
    sessionStorage.setItem('index', index);
  }

  //取出当前点击的数组对象的索引
  var index1 = sessionStorage.getItem('index');
  console.log('一级菜单:',index1);
  var xx = JSON.parse(sessionStorage.getItem('xx'));
  console.log('x刷新后',xx);
  var yy = JSON.parse(sessionStorage.getItem('yy'));
  console.log('y刷新后',yy);
  var zz = JSON.parse(sessionStorage.getItem('zz'));
  console.log('z刷新后',zz);
  if(index1!==null){
    // $scope.groups[index].open = true;
    if(xx%2==1){
      $scope.groups[0].open = true;
    }
    else{
      $scope.groups[0].open = false;
    }

    if(yy%2==1){
      $scope.groups[1].open = true;
    }
    else{
      $scope.groups[1].open = false;
    }

    if(zz%2==1){
      $scope.groups[2].open = true;
    }
    else{
      $scope.groups[2].open = false;
    }
  }

  setTimeout(() => {
    console.log($('.sonItem'));
    $(".sonItem").click(function(){
      $(".sonItem").css("background","#2F2F2F");
      var index2 = $('.sonItem').index(this);
      $(".sonItem").eq(index2).css("background","#c33636");
      sessionStorage.setItem('index2', index2);
    });
    var index2 = JSON.parse(sessionStorage.getItem('index2'));
    console.log(index2);
    if(index2!==null){
      $(".sonItem").eq(index2).css("background","#c33636");
    }
  }, 50);
});
