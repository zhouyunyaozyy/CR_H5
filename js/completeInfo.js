var openid = JSON.parse(window.sessionStorage.getItem("openid")) || "";
var popupType;
$(function(){
  var url_obj =url_analysis(window.location.search)
  if(url_obj.code){
    getCallBack({code:url_obj.code},"/dabai-chaorenjob/seeker/getWeChatOpenId",getOpenId)
    return;
  }else{
    if(!openid.openid){
      popupType = 1;
      showPopup("微信授权失败")
      return;
    }else{
      var nativeData = {
        username: openid.openid
      }
      aesData.pageStatus = 'login';
      jiami(nativeData)
      //console.log(nativeData,win.aesData)
      var postData = aesData.jiamiData;
      postCallBack(postData,'/dabai-authority/externalPlatformLogin/weChatLogin',login)
    }
  }
})
function getOpenId(res){
  if(res.code == 1){
    if(res.data){
      window.sessionStorage.setItem("openid",res.data);
      var nativeData = {
        username: res.data
      }
      openid = JSON.parse(res.data);
      aesData.pageStatus = 'login';
      jiami(nativeData)
      //console.log(nativeData,win.aesData)
      var postData = aesData.jiamiData;
      postCallBack(postData,'/dabai-authority/externalPlatformLogin/weChatLogin',login)
    }else{
      popupType = 2;
      showPopup("微信授权失败")
    }
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
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
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function test(el,type){
  var val = $(el).val();
  var reg1 = /^1[34578][0-9]{9}$/;
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
      if(!val || !/^[0-9]{4}$/.test(val)){
        $(el).parents(".ipt_item").next(".alert_cont").text("*请输入4位验证码").addClass("is_active");
        return false;
      }else{
        $(el).parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
        return true;
      }
  }
}
function blurTest(){
  if(!test(".js_phone",1)) {
    return false;
  }else if(!test(".js_code",2)){
    return false;
  }
  return true;
}
$(".js_phone").keyup(function(){
  if(blurTest()){
    $(".submit_btn").addClass("is_active")
  }else{
    $(".submit_btn").removeClass("is_active")
  }
})
$(".js_code").keyup(function(){
  if(blurTest()){
    $(".submit_btn").addClass("is_active")
  }else{
    $(".submit_btn").removeClass("is_active")
  }
})
$(".js_regist").click(function(){
  if(!blurTest()){
    return;
  }
  // RSA加密
  var encrypt = new JSEncrypt()
  var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'
  encrypt.setPublicKey(publicKey)
  var phone = encrypt.encrypt($(".js_phone").val())
  var eid =  encrypt.encrypt(openid.openid)
  var postData = {
    mobile: phone,
    eid: eid,
    verificationId: aesData.validationUid,
    verificationCode: $(".js_code").val(),
    externalPlatform:"WECHAT"
  }
  postCallBack(postData,"/dabai-chaorenjob/externalRegister/registerByExternal",setPwd)
})
function setPwd(res){
  console.log(res)
  if(res.code == 1){
    if(res.data){
      window.location.href = "WXpwd.html"
    }else{
      var nativeData = {
        username: openid.openid
      }
      aesData.pageStatus = 'login';
      jiami(nativeData)
      //console.log(nativeData,win.aesData)
      var postData = aesData.jiamiData;
      postCallBack(postData,'/dabai-authority/externalPlatformLogin/weChatLogin',login)
    }
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
}
$(".code_btn").click(function(){
  var phone = $(".js_phone").val();
  if(!/^1[34578][0-9]{9}$/.test(phone)){
    $(".js_phone").parents(".ipt_item").next(".alert_cont").text("*请输入正确手机号").addClass("is_active");
    return false;
  }
  var resultData = {};
  resultData.mobile =  phone;
  postCallBack(resultData,'/dabai-chaorenjob/externalRegister/getExternalRegisterVerificationId',getCode)
})
function getCode(res){
  if(res.code == 1){
    aesData.validationUid = res.data;
    popupType = 1;
    showPopup("验证码已发送，请注意查收")
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