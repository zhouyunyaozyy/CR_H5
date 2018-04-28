var comPhone,comCode,appid;
$(function(){
  var url_obj =url_analysis(window.location.search)
  comPhone = url_obj.phone;
  comCode = url_obj.code;
  appid = url_obj.appid;
  console.log(url_obj)
})
