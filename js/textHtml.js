$(function(){
  var args = window.sessionStorage.getItem("args")
  var title = window.sessionStorage.getItem("title")
  $(".title").text(title);
  $(".g_container").text(args);
})