var search = url_analysis(window.location.search)
var target,popupType;
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
function initResume(res){
  if(res.code == 1){
    if(search.type != 1){
      switch (res.data.steps){
        case 700:
          popupType = 8;
          showPopup("请修改原简历，不能新增简历")
          return;
      }
    }else{
      $(".back").attr("href","modifyResume.html")
      $(".title").text("求职意向")
      $(".js_one").text("确认")
    }
    target = res.data.target
    getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc,res.data.target)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else {
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function initFuc(res,target){
  if(res.code == 1){
    var html = '';
    for(var i = 0;i<res.data.length;i++){
      if(res.data[i].rtid == target){
        html += '<div class="one_job_item is_checked" data-rtid="'
      }else{
        html += '<div class="one_job_item" data-rtid="'
      }
      html +=
      res.data[i].rtid +
      '"><span class="one_label">' +
      res.data[i].name +
      '</span><span class="one_radio"><i class="iconfont icon-gou"></i></span></div>'
    }
    $(".one_job_cont").html(html)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else {
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".one_job_cont").on("click",".one_radio",function(){
  target = $(this).parent(".one_job_item").attr("data-rtid");
  $(this).parent(".one_job_item").addClass("is_checked").siblings(".is_checked").removeClass("is_checked");
})
var updateState = 0;
$(".js_one").click(function(){
  if(updateState === 0){
    updateState = 1;
  }else{
    popupType = 1;
    showPopup("信息验证中请耐心等待。。。")
    return;
  }
  if(!target){
    popupType = 1;
    showPopup("请选择求职意向")
    return;
  }else{
    postCallBack({"target":target},"/dabai-chaorenjob/resume/updateTargetResume",updateTarget)
  }
})
function updateTarget(res){
  if(res.code == 1){
    if(search.type == 1){
      window.location.href = "modifyResume.html"
    }else{
      postCallBack({steps:200},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function updateSteps(res){
  if(res.code == 1){
    window.location.href = "stepTwo.html"
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
    case 8:
      window.location.href = "resumeDetail.html"
      break;
    default :
      hidePopup()
      return;
  }
})
$(".js_back").click(function(){
  showPopup("内容未保存,返回将导致内容丢失，是否确认返回？",1)
})
$(".popup_suc").click(function(){
  window.location.href = "my.html"
})
$(".popup_err").click(function(){
  hidePopup()
})