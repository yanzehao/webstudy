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



