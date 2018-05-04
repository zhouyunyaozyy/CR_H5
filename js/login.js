window.sessionStorage.removeItem("ticket");
window.sessionStorage.removeItem("ticketsSalt");
window.sessionStorage.removeItem("openid");
var popupType;
function test(el,type){
  var val = $(el).val();
  var reg1 = /^1[34578][0-9]{9}$/;
  console.log(val.length)
  switch (type){
    case 1:
      if(!val || !reg1.test(val)){
        $(el).parents(".ipt_item").next(".alert_cont").text("*请输入正确手机号").addClass("is_active");
        return false;
      }else{
        $(el).parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
        return true;
      }
    case 2:
      if(!val || val.length < 6 || val.length > 12){
        $(el).parents(".ipt_item").next(".alert_cont").text("*请输入6-12位密码").addClass("is_active");
        return false;
      }else{
        $(el).parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
        return true;
      }
  }
}
$(".js_phone").keyup(function(){
  if(blurTest()){
    $(".submit_btn").addClass("is_active")
  }else{
    $(".submit_btn").removeClass("is_active")
  }
})
$(".js_pwd").keyup(function(){
  if(blurTest()){
    $(".submit_btn").addClass("is_active")
  }else{
    $(".submit_btn").removeClass("is_active")
  }
})
function blurTest(){
  if(!test(".js_phone",1)) {
    return false;
  }else if(!test(".js_pwd",2)){
    return false;
  }
  return true;
}
$(".js_login").click(function(){
  if(!blurTest()){
    return;
  }
  var nativeData = {
    username: $(".js_phone").val(),
    password: $(".js_pwd").val()
  }
  aesData.pageStatus = 'login';
  jiami(nativeData)
  //console.log(nativeData,win.aesData)
  var postData = aesData.jiamiData;
  postCallBack(postData,'/dabai-authority/authority/login',login)
})
function login(res){
  if(res.code == 1){
    jieMi(res.data)
    postCallBack({},'/dabai-chaorenjob/seeker/getUserInfoByTickets',loginTest)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function loginTest(res){
  if(res.code == 1){
    window.location.href = "index.html"
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".popup_hide").click(function(){
  switch (popupType){
    case 1:
      hidePopup()
      break;
    case 2:
      window.location.href = "login.html"
      break;
  }
})
$(".weixin").click(function(){
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21adcd1f047e3a45&redirect_uri=http://c-test.chaorenjob.com/completeInfo.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
  //window.location.href = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21adcd1f047e3a45&secret=b0c5b6e084dc71147365dc87f3b4e11e&code=CODE&grant_type=authorization_code"
})