var win = this;
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
  win.aesData.pageStatus = 'login';
  jiami(nativeData)
  //console.log(nativeData,win.aesData)
  var postData = win.aesData.jiamiData;
  postCallBack(postData,'/dabai-authority/authority/login',login)
})
function login(res){
  if(res.code == 1){
    jieMi(res.data)
    setTimeout(function(){
      var postData = {
        ticket:window.sessionStorage.getItem("ticket"),
        ticketsSalt:window.sessionStorage.getItem("ticketsSalt")
      }
      postCallBack(postData,'/dabai-chaorenjob/seeker/getUserInfoByTickets',loginTest)
    },0)
  }
  console.log(res)
}
function loginTest(res){
  if(res.code == 1){
    window.location.href = "index.html"
  }
  console.log(res)
}