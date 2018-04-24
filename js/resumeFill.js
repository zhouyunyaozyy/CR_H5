getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
function initResume(res){
  if(res.code == 1){
    switch (res.data.steps){
      case 200:
        $(".resume_btn").attr("href","stepTwo.html")
        break;
      case 300:
        $(".resume_btn").attr("href","stepThree.html")
        break;
      case 400:
        $(".resume_btn").attr("href","stepFour.html")
        break;
      case 500:
        $(".resume_btn").attr("href","stepFive.html")
        break;
      case 600:
        $(".resume_btn").attr("href","stepSix.html")
        break;
      case 700:
        $(".resume_btn").attr("href","resumeDetail.html")
        break;
      default:
        $(".resume_btn").attr("href","stepOne.html")
        break;
    }
  }
  console.log(res)
}