var search = url_analysis(window.location.search)
var target;
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
function initResume(res){
  if(res.code == 1){
    if(search.type != 1){
      switch (res.data.steps){
        case 700:
          alert("请修改原简历，不能新增简历")
          return;
      }
    }else{
      $(".back").attr("href","modifyResume.html")
      $(".title").text("求职意向")
      $(".js_one").text("确认")
    }
    target = res.data.target
    getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc,res.data.target)
  }
  console.log(res)
}
function initFuc(res,target){
  if(res.code == 10002){
    window.location.href = "login.html"
  }else if(res.code == 1){
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
  }
  console.log(res)
}
$(".one_job_cont").on("click",".one_radio",function(){
  target = $(this).parent(".one_job_item").attr("data-rtid");
  $(this).parent(".one_job_item").addClass("is_checked").siblings(".is_checked").removeClass("is_checked");
})
$(".js_one").click(function(){
  if(!target){
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
  }
  console.log(res)
}
function updateSteps(res){
  if(res.code == 1){
    window.location.href = "stepTwo.html"
  }
  console.log(res)
}