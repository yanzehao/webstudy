var app = angular.module('app', ['ui.router','ui.bootstrap','ngAnimate','ngTouch','ngMessages']);
// ["ui.router", "ui.bootstrap", "ngFileUpload", "ngAnimate", "ngSanitize","ng.ueditor","ngMessages"]
app.config(function ($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('login',{
    url:'/login',
    templateUrl:'./html/login.html',
  })
  .state('dashboard',{
    url:'/dashboard',
    templateUrl:'./html/dashboard.html',
  })
  .state('dashboard.list',{
    //url传参
    url:'/list?page&size&title&author&startAt&endAt&status&type',
    templateUrl:'./html/list.html',
  })
  .state('dashboard.detail',{
    url:'/detail',
    templateUrl:'./html/detail.html',
  });
});

