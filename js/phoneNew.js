getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
var verificationId,popupType;
function initMy(res){
  if(res.code == 1){
    $(".phone_show span").text(res.data.mobile)
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".code_btn").click(function(){
  var phone = $('.js_phone').val();
  if(!phone){
    return;
  }
  postCallBack({mobile:phone},"/dabai-chaorenjob/seeker/changeMobileAfterVerificationId",getCode)
})
function getCode (res){
  if(res.code == 1){
    verificationId = res.data;
    popupType = 1;
    showPopup("验证码已发送，请注意查收")
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".js_submit").click(function(){
  var changeMobileTickets = window.sessionStorage.getItem("mobileTickets")
  var code = $(".js_code").val();
  var phone = $('.js_phone').val();
  if(!changeMobileTickets){
    popupType = 1;
    showPopup("请先验证原手机号")
    return;
  }else if(!/^1[34578][0-9]{9}$/.test(phone)){
    return;
  }else if(!/^[0-9]{4}$/.test(code)){
    return;
  }else if(!verificationId){
    popupType = 1;
    showPopup("请重新获取验证码")
    return;
  }
  var dataPost = {
    mobile:phone,
    verificationId:verificationId,
    verificationCode:code,
    changeMobileTickets:changeMobileTickets
  }
  postCallBack(dataPost,"/dabai-chaorenjob/seeker/changMobile",modifyPhone)
})
function modifyPhone(res){
  if(res.code == 1){
    window.location.href = "set.html"
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
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