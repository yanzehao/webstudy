app.controller('AccordionCtrl', function ($scope) {

  
    console.log($(".sonItem"));
    $(".sonItem").click(function(){
        window.location.reload();
        var index = $(this).index()
        console.log(index);
        sessionStorage.setItem('index', index);
    });
    var index = JSON.parse(sessionStorage.getItem('index'));
    console.log(index);
    if(index!==null){
        $(".sonItem").eq(index-1).css("background","red");
    }
  
  });
  