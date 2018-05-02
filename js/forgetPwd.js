var popupType;
$(".code_btn").click(function(){
  var resultData = {};
  resultData.mobile = $(".js_phone").val()
  getCallBack(resultData,'/dabai-chaorenjob/seeker/getForgetPasswordVerificationId',getCode)
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
      if(!val || val.length < 6 || val.length > 12){
        $(el).parents(".ipt_item").next(".alert_cont").text("*请输入6-12位密码").addClass("is_active");
        return false;
      }else{
        $(el).parents(".ipt_item").next(".alert_cont").text("").removeClass("is_active");
        return true;
      }
    case 3:
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
  }else if(!test(".js_code",3)){
    return false;
  }else if(!test(".js_pwd",2)){
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
$(".js_pwd").keyup(function(){
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
$(".js_forget").click(function(){
  if(!blurTest()){
    return;
  }
  var nativeData = {
    mobile: $(".js_phone").val(),
    password: $(".js_pwd").val(),
    verificationId: aesData.validationUid,
    verificationCode: $(".js_code").val()
  }
  aesData.pageStatus = 'forget';
  jiami(nativeData)
  console.log(aesData)
  var postData = aesData.jiamiData;
  postCallBack(postData,'/dabai-chaorenjob/seeker/forgetPassword',forget)
})
function forget(res){
  if(res.code == 1){
    popupType = 2;
    showPopup("修改成功，前往登录！")
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