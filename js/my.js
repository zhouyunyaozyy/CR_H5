getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
getCallBack({},"/dabai-chaorenjob/resume/getResumeSteps",initState)
function initMy(res){
  if(res.code == 1){
    if(res.data.headerUrl){
      $(".top_avatar img").attr("src",res.data.headerUrl)
    }
    $(".user_phone").text(res.data.mobile)
    getCallBack({uid:res.data.uid},"/dabai-chaorenjob/certification/queryCheckStatus",userState)
  }
  console.log(res)
}
function userState(res){
  if(res.code == 1){
    var html = '';
    if(!res.data || !res.data.status || res.data.status != 4){
      html = '<div class="auth_state">未认证</div>'
    }else if(res.data.status == 4){
      html = '<div class="auth_state auth_ok"><i class="iconfont icon-v"></i>认证</div><div class="user_name">' +
      res.data.name +
      '</div>'
    }
    $(".user_phone").before(html)
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
  }
  console.log(res)
}