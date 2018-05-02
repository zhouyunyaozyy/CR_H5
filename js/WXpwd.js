var openid = window.sessionStorage.getItem("openid");
var popupType;
if(!openid.openid){
  popupType = 2;
  showPopup("微信授权失败")
}
$(".js_regist").click(function(){
  var pwd = $(".js_pwd").val();
  if(!pwd || pwd.length < 6 || pwd.length > 12){
    $(".js_pwd").parents(".ipt_item").next(".alert_cont").text("*请输入6-12位密码").addClass("is_active");
    return;
  }else{
    $(".js_pwd").parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
  }
  // RSA加密
  var encrypt = new JSEncrypt()
  var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'
  encrypt.setPublicKey(publicKey)
  var eid =  encrypt.encrypt(openid.openid)
  var postData = {
    eid: eid,
    password: encrypt.encrypt(pwd),
    externalPlatform:"WECHAT"
  }
  postCallBack(postData,"/dabai-chaorenjob/externalRegister/resetPasswordByExternal",setPwd)
})
function setPwd(res){
  if(res.code == 1){
    var nativeData = {
      username: openid
    }
    aesData.pageStatus = 'login';
    jiami(nativeData)
    //console.log(nativeData,win.aesData)
    var postData = aesData.jiamiData;
    postCallBack(postData,'/dabai-authority/externalPlatformLogin/weChatLogin',login)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
}
function login(res){
  if(res.code == 1){
    jieMi(res.data)
    postCallBack({},'/dabai-chaorenjob/seeker/getUserInfoByTickets',loginTest)
  }else if(res.code == 10010){

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
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".js_pwd").keyup(function(){
  var pwd = $(".js_pwd").val();
  if(!pwd || pwd.length < 6 || pwd.length > 12){
    $(".js_pwd").parents(".ipt_item").next(".alert_cont").text("*请输入6-12位密码").addClass("is_active");
    $(".submit_btn").removeClass("is_active")
    return;
  }else{
    $(".js_pwd").parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
    $(".submit_btn").addClass("is_active")
  }
})
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