(function() {
     'use strict';
 
     angular.module('app').factory('LocalStorageService',['$window',function($window){
           var service = {};
 
           service.setLocalStorage = setLocalStorage;
           service.getLocalStorage = getLocalStorage;
           service.setLocalStorageObject = setLocalStorageObject;
            service.getLocalStorageObject = getLocalStorageObject;
  
            function setLocalStorage(key,value){
              $window.localStorage[key]=value;
            }
            
            function getLocalStorage(key,defaultValue){
              return  $window.localStorage[key] || defaultValue;
            }
                   //存储对象，以JSON格式存储
            function setLocalStorageObject(key,value){
              $window.localStorage[key]=JSON.stringify(value);
            }
                  //读取对象
            function getLocalStorageObject(key) {
              return JSON.parse($window.localStorage[key] || '{}');
            }
  
            return service;
          }]);
  })()