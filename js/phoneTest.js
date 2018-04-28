getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
var verificationId;
function initMy(res){
  if(res.code == 1){
    $(".phone_show span").text(res.data.mobile)
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
  }
  console.log(res)
}
$('.js_next').click(function(){
  var code = $(".js_code").val();
  if(!/^[0-9]{4}$/.test(code)){
    return;
  }else if(!verificationId){
    alert("请重新获取验证码")
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
  }
  console.log(res)
}