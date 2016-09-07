
$(function(){
  initJs();

  function initJs() {
    var myName = $("#myName");
    var tab = $(".tab");
    myName.add(tab).on("hover",function() {
      $(this).toggleClass("cur");
    })
  }

})