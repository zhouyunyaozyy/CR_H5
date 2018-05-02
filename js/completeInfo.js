var comPhone,comCode,openid;
$(function(){
  var url_obj =url_analysis(window.location.search)
  getCallBack({code:url_obj.code},"/dabai-chaorenjob/seeker/getWeChatOpenId",getOpenId)
  comCode = url_obj.code;
  console.log(url_obj)
})
function getOpenId(res){
  console.log(res)
}