getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
var verificationId;
function initMy(res){
  if(res.code == 1){
    $(".phone_show span").text(res.data.mobile)
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
  }
  console.log(res)
}
$(".js_submit").click(function(){
  var changeMobileTickets = window.sessionStorage.getItem("mobileTickets")
  var code = $(".js_code").val();
  var phone = $('.js_phone').val();
  if(!changeMobileTickets){
    alert("请先验证原手机号")
    return;
  }else if(!/^1[34578][0-9]{9}$/.test(phone)){
    return;
  }else if(!/^[0-9]{4}$/.test(code)){
    return;
  }else if(!verificationId){
    alert("请重新获取验证码")
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
  }
  console.log(res)
}