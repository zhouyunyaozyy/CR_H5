getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
var verificationId,popupType;
function initMy(res){
  if(res.code == 1){
    $(".phone_show span").text(res.data.mobile)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".code_btn").click(function(){
  var phone = $('.phone_show span').text();
  if(!phone){
    return;
  }
  postCallBack({},"/dabai-chaorenjob/seeker/changeMobileBeforeVerificationId",getCode)
})
function getCode (res){
  if(res.code == 1){
    verificationId = res.data;
    popupType = 1;
    showPopup("验证码已发送，请注意查收")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$('.js_next').click(function(){
  var code = $(".js_code").val();
  if(!/^[0-9]{4}$/.test(code)){
    return;
  }else if(!verificationId){
    popupType = 1;
    showPopup("请重新获取验证码")
    return;
  }
  var postData = {
    verificationId:verificationId,
    verificationCode:code
  }
  postCallBack(postData,"/dabai-chaorenjob/seeker/changeMobileSureBeforeVerification",nextStep)
})
function nextStep(res){
  if(res.code == 1){
    window.sessionStorage.setItem("mobileTickets",res.data)
    window.location.href = "phoneNew.html"
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
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