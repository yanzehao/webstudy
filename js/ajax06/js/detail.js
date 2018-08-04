
app.controller('detailctrl', function($scope, FileUploader, $state, $http, $stateParams,) {
  //选择类型
  $scope.types = [
    {id: " ", label: "请选择"},
    {id: "0", label: "首页banner"},
    {id: "1", label: "找职位banner"},
    {id: "2", label: "找精英banner"},
    {id: "3", label: "行业大图"}
  ]
  //默认显示为全部
  $scope.type = $scope.types[0].id;
  
  //行业大图分类
  $scope.industrys = [
    {id: " ", label: "请选择"},
    {id: "0", label: "移动互联网"},
    {id: "1", label: "电子商务"},
    {id: "2", label: "企业服务"},
    {id: "3", label: "O2O"},
    {id: "4", label: "教育"},
    {id: "5", label: "金融"},
    {id: "6", label: "游戏"},
  ]
  //默认显示为全部
  $scope.industry = $scope.industrys[0].id;
  
  // 取消按钮
  $scope.cancel = function() {
    $state.go("dashboard.list");
  };

  //富文本编辑器
  var E = window.wangEditor;
  var editor1 = new E('#div1', '#div2');
  // 使用 base64 保存图片
  editor1.customConfig.uploadImgShowBase64 = true   
  editor1.create();
  //获取内容 
  document.getElementById('btn2').addEventListener('click', function (edtext) {
    $scope.edtext = editor1.txt.text();
  }, false)
  
  //图片上传插件
  var uploader = $scope.uploader = new FileUploader({
    url: "/carrots-admin-ajax/a/u/img/task",
    queueLimit : 1,
  });

  // FILTERS
  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  // CALLBACKS
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    console.info('onSuccessItem',response);
    $scope.imgUrl = response.data.url;
    console.log($scope.imgUrl);
  };

//---------------------------------------------------------------------------------------------
// 编辑
  // if ($stateParams.id) {
  //   // $scope.listTitle = "编辑Article";
  
  //   // 编辑渲染数据
  //   $http({
  //       method: 'get',
  //       url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
  //   }).then(function (result) {
  //       console.log($stateParams.id);
  //       console.log(result.data.data.article);
  //       var singleList = result.data.data.article;
  //       $scope.title = singleList.title;
  //       $scope.type = singleList.type;
  //       $scope.htmlVariable = singleList.content;
  //       $scope.link = singleList.url;
  //       $scope.img_view = singleList.img;
  //       $scope.createAt = singleList.createAt;
  //       $scope.industry = singleList.industry;
  //       // console.log($scope.img_view)
  //   })
  
  //   // 编辑的上线
  //   $scope.onLine = function () {
  //     $http({
  //       method: 'put',
  //       url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
  //       params: {
  //         title: $scope.title,
  //         type: $scope.type,
  //         status: 2,
  //         img: $scope.img_view,
  //         content: edtext,
  //         url: $scope.link,
  //         createAt: $scope.createAt,
  //         // industry: $scope.industry
  //       },
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     }).then(function (resp) {
  //       console.log(resp);
  //       if (resp.data.code === 0) {
  //         $state.go('dashboard.list');
  //       }
  //     })
  //   }
  //   // 编辑的存为草稿
  //   $scope.save = function () {
  //       $http({
  //           method: 'put',
  //           url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
  //           params: {
  //               title: $scope.title,
  //               type: $scope.type,
  //               status: 1,
  //               img: $scope.img_view,
  //               content: $scope.htmlVariable,
  //               url: $scope.link,
  //               createAt: $scope.createAt,
  //               // industry: $scope.industry
  //           },
  //           headers: {
  //               'Content-Type': 'application/x-www-form-urlencoded'
  //           }
  //       }).then(function (resp) {
  //           console.log(resp);
  //           if (resp.data.code === 0) {
  //               $state.go('dashboard.list');
  //           }
  //       })
  //   }
  // }
  // // 新增
  // else {
    $scope.editOrAdd = "新增Article"

  // 编辑
  if($stateParams.id){
    $scope.editOrAdd = "编辑Article"
    $http({
      method: "get",
      url: "/carrots-admin-ajax/a/article/" + $stateParams.id,
      responseType: "json"
    }).then(function (res) {
      console.log(res);
      $scope.title    = res.data.data.article.title;
      $scope.type     = res.data.data.article.type;
      $scope.industry = res.data.data.article.industry;
      $scope.edtext   = res.data.data.article.content;
      $scope.link     = res.data.data.article.url;
      $scope.imgUrl   = res.data.data.article.img;
      $scope.createAt = res.data.data.article.createAt;
    });
  }

  // title: $scope.title,
  // type: $scope.type,
  // status: 2,
  // img: $scope.imgUrl,
  // content: $scope.edtext,
  // url: $scope.link,
  // industry: $scope.industry
     
  // 新增的立即上线
  $scope.onLine = function () {
    $http({
      method: 'post',
      url: '/carrots-admin-ajax/a/u/article/',
      params: {
        title: $scope.title,
        type: $scope.type,
        status: 2,
        img: $scope.imgUrl,
        content: $scope.edtext,
        url: $scope.link,
        industry: $scope.industry
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (resp) {
      console.log(resp);
      if (resp.data.code === 0) {
        $state.go('dashboard.list');
      }
    })
  }

  // 新增的存为草稿
  $scope.save = function () {
    $http({
      method: 'post',
      url: '/carrots-admin-ajax/a/u/article/',
      params: {
        title: $scope.title,
        type: $scope.b,
        status: 1,
        img: $scope.imgUrl,
        content: editor1.txt.text(),
        url: $scope.link,
        // industry: $scope.industry
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (resp) {
      console.log(resp);
      if (resp.data.code === 0) {
        $state.go('dashboard.list');
      }
    })
  }
});
