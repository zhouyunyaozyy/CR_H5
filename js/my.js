var popupType;
getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
getCallBack({},"/dabai-chaorenjob/resume/getResumeSteps",initState)
function initMy(res){
  if(res.code == 1){
    if(res.data.headerUrl){
      $(".top_avatar img").attr("src",res.data.headerUrl)
    }
    $(".user_phone").text(res.data.mobile)
    if(res.data.name){
      $(".user_phone").before('<div class="user_name">' + res.data.name + '</div>')
    }
    getCallBack({uid:res.data.uid},"/dabai-chaorenjob/certification/queryCheckStatus",userState)
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
function userState(res){
  if(res.code == 1){
    var html = '';
    if(!res.data || res.data != 4){
      html = '<a href="realName.html" class="auth_state">未认证</a>'
    }else if(res.data == 4){
      html = '<a href="realName.html" class="auth_state auth_ok"><i class="iconfont icon-v"></i>认证</a>'
    }
    $(".top_avatar").after(html)
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
function initState(res){
  if(res.code == 1){
    switch (res.data){
      case 200:
        $(".resume_scale").attr("href","stepTwo.html")
        break;
      case 300:
        $(".resume_scale").attr("href","stepThree.html")
        break;
      case 400:
        $(".resume_scale").attr("href","stepFour.html")
        break;
      case 500:
        $(".resume_scale").attr("href","stepFive.html")
        break;
      case 600:
        $(".resume_scale").attr("href","stepSix.html")
        break;
      case 700:
        $(".resume_scale").attr("href","resumeDetail.html")
        break;
      default:
        $(".resume_scale").attr("href","resumeFill.html")
        break;
    }
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
$(".download_close").click(function(){
  $(".download_cont").animate({
    width: "0px"
  })
})