var search = url_analysis(window.location.search);
var popupType;
getCallBack({rrid:search.rrid},"/dabai-chaorenjob/resumeReceived/getVoteDetail",init)
function init(res){
  console.log(res)
  if(res.code == 1){
    $(".logo").attr("href","companyInfo.html?type=4&rrid=" +
    search.rrid +
    "&cid=" + res.data.cid)
    $(".logo img").attr("src",res.data.logoUrl)
    $(".job_name").text(res.data.name)
    $(".company_name").text(res.data.name_short)
    $(".label_address span").text(address(res.data.address,2))
    $(".label_exp span").text(formatData(res.data.work_experience,"jobExperience"))
    $(".label_money span").text(formatData(res.data.wages,"wages"))
    switch (res.data.status){
      case 3:
        $(".state_img").html('<img src="img/state_m.png" alt=""/>')
        $(".interviewer_time").text(formatDate(res.data.agreedtime,2))
        $(".interviewer_address").text(res.data.agreedpath)
        if(res.data.agreednote){
          $(".leave_msg").text(res.data.agreednote)
        }else{
          $(".interviewer_title").css("display","none")
        }
        var msg = "您好，您已被我司选中参加线下面试。作为该面试的候选人，请认真查阅通知信息，并做好相应准备。"
        $(".state_msg").text(msg)
        break;
      case 4:
        $(".state_img").html('<img src="img/state_b.png" alt=""/>')
        var msg = "感谢您对我司的认同，经过综合评估，我司已确定了最适合的人选。非常遗憾未能与您成为同事，相信以您的优秀才干，一定能很快找到更适合的岗位，期待将来我们能有机会合作。"
        $(".state_msg").text(res.data.agreednote || msg)
        $(".interviewer").remove();
        break;
      default:
        $(".delivery_info").remove();
        break;
    }
    switch (res.data.sure){
      case 0:
        break;
      case 1:
        $(".interviewer_err").css("display","none")
        $(".interviewer_suc").addClass("block")
        break;
      case 2:
        $(".interviewer_suc").css("display","none")
        $(".interviewer_err").addClass("block")
        break;
    }
    if(res.data.timeOut == 1){
      $(".interviewer_btn").addClass("is_overdue")
    }
    if(res.data.logs.length > 0){
      var html = '';
      for(var i = 0;i<res.data.logs.length;i++){
        html += '<div class="history_item"><img src="img/dot.png" alt=""/><span class="history_time">' +
        formatDate(res.data.logs[i].create_time,2) +
        '</span><span class="history_text">' +
        formatData(res.data.logs[i].type,"userDeliveryState") +
        '</span></div>'
      }
      $(".history_title").after(html)
    }else{
      $(".history_title").after("<span class='no_delivery'>暂无处理记录</span>")
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
}
$(".interviewer_suc").click(function(){
  if($(".interviewer_btn").hasClass("is_overdue")){
    return;
  }
  postCallBack({rrid:search.rrid},"/dabai-chaorenjob/resumeReceived/acceptResumeReceived",sucConfirm)
})
function sucConfirm(res){
  if(res.code == 1){
    $(".interviewer_suc").addClass("block")
    $(".interviewer_err").css("display","none")
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
}
$(".interviewer_err").click(function(){
  if($(".interviewer_btn").hasClass("is_overdue")){
    return;
  }
  $(".refuse_cont").css("display","block")
})
$(".refuse_err").click(function(){
  $(".refuse_cont").css("display","none")
})
$(".refuse_suc").click(function(){
  var ure_mark = $(".refuse_text textarea").val();
  if(!ure_mark){
    popupType = 1;
    showPopup("请填写拒绝原因")
    return;
  }else if(ure_mark.length > 20){
    popupType = 1;
    showPopup("拒绝原因不能超过20字")
    return;
  }
  postCallBack({rrid:search.rrid,ure_mark:ure_mark},"/dabai-chaorenjob/resumeReceived/refuseResumeReceived",refuse)
})
function refuse(res){
  if(res.code == 1){
    $(".interviewer_err").addClass("block")
    $(".interviewer_suc").css("display","none")
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
  console.log()
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