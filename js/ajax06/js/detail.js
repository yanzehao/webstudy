
app.controller('detailctrl', ['$scope', 'FileUploader', function($scope, FileUploader, $http, $state,$stateParams,) {
  // 取消按钮
  $scope.quxiao = function() {
    $state.go("dashboard.list");
  };

  //富文本编辑器
  var E = window.wangEditor;
  var editor1 = new E('#div1', '#div2');
  editor1.create();

  //图片上传插件
  var uploader = $scope.uploader = new FileUploader({
    url: 'upload.php'
  });

  // FILTERS

  // a sync filter
  uploader.filters.push({
    name: 'syncFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      console.log('syncFilter');
      return this.queue.length < 10;
    }
  });

  // an async filter
  uploader.filters.push({
    name: 'asyncFilter',
    fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
      console.log('asyncFilter');
      setTimeout(deferred.resolve, 1e3);
    }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
    console.info('onCompleteAll');
  };
  console.info('uploader', uploader);
}]);
