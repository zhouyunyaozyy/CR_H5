var comPhone,comCode,appid;
$(function(){
  var url_obj =url_analysis(window.location.search)
  getCallBack({code:url_obj.code},"/dabai-chaorenjob/seeker/getWeChatOpenId",getOpenId)
  comPhone = url_obj.phone;
  comCode = url_obj.code;
  appid = url_obj.appid;
  console.log(url_obj)
})
function getOpenId(res){
  console.log(res)
}