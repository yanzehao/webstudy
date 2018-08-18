var app = angular.module('app', ['ui.router','oc.lazyLoad','ui.bootstrap','ngAnimate','ngTouch','ngMessages','angularFileUpload']);
app.config(function ($stateProvider,$urlRouterProvider,$controllerProvider){
  app.controller = $controllerProvider.register;
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  //登录页面
  .state('login',{
    url:'/login',
    templateUrl:'./html/login.html',
    controller:"loginctrl",
    resolve:{
      deps:["$ocLazyLoad",function($ocLazyLoad){
        return $ocLazyLoad.load("./js/login.js");
      }]
    }
  })

  // 后台主页
  .state('dashboard',{
    url:'/dashboard',
    templateUrl:'./html/dashboard.html',
    controller:"AccordionCtrl",
    resolve:{
      deps:["$ocLazyLoad",function($ocLazyLoad){
        return $ocLazyLoad.load("./js/dashboard.js");
      }]
    }
  })

  // 后台列表页
  .state('dashboard.list',{
    //url传参
    url:'/list?page&size&title&author&startAt&endAt&status&type',
    templateUrl:'./html/list.html',
    controller:"listctrl",
    resolve:{
      deps:["$ocLazyLoad",function($ocLazyLoad){
        return $ocLazyLoad.load("./js/list.js");
      }]
    }
  })
  
  //后台详情页
  .state('dashboard.detail',{
    url:'/detail?id',
    templateUrl:'./html/detail.html',
    controller:"detailctrl",
    resolve:{
      deps:["$ocLazyLoad",function($ocLazyLoad){
        return $ocLazyLoad.load("./js/detail.js");
      }]
    }
  });
});

