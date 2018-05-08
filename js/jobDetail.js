var search =  url_analysis(window.location.search);
var isFavorites,popupType;
getCallBack({jid:search.jid},"/dabai-chaorenjob/job/getJobEntityAndVoteAndFavoritesInfo",init)
$(function(){
  switch (parseInt(search.type)){
    case 1:
      break;
    case 2:
      $(".back").attr("href","jobCollect.html")
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
  }
})
function init(res){
  if(res.code == 1){
    $(".job_name").text(res.data.name)
    $(".job_logo img").attr("src",res.data.logoUrl)
    $(".js_area").text(address(res.data.address+"",2))
    $(".js_wages").text(formatData(res.data.wages,"wages"))
    $(".js_exp").text(formatData(res.data.work_experience,"jobExperience"))
    $(".js_education").text(formatData(res.data.education,"education"))
    $(".js_num").text(res.data.hire_number+"人")
    $(".see_info").attr("data-cid",res.data.cid)
    $('.item_desc').text(res.data.profile)
    isFavorites = res.data.isFavorites;
    if(res.data.isFavorites){
      $(".job_collect").addClass("is_active").find("span").text("已收藏")
    }else{
      $(".job_collect").removeClass("is_active").find("span").text("未收藏")
    }
    if(res.data.isVote){
      $(".job_btn").addClass("is_active").removeClass("js_job").text("已投递")
    }else{
      $(".job_btn").removeClass("is_active").text("投递简历")
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
$(".see_info").click(function(){
  window.sessionStorage.setItem("jid",search.jid)
  window.location.href = "companyInfo.html?cid="+$(this).attr("data-cid")
})
$('.js_collect').click(function(){
  var url;
  if(!ticketsSalt || !ticket){
    popupType = 2;
    showPopup("请先登录！",1)
    return;
  }
  if(isFavorites){
    url = '/dabai-chaorenjob/favorites/cancelFavorites'
  }else{
    url = '/dabai-chaorenjob/favorites/favoritesJob'
  }
  postCallBack({oid:search.jid},url,collect)
})
function collect(res){
  console.log(res)
  if(res.code == 1){
    getCallBack({jid:search.jid},"/dabai-chaorenjob/job/getJobEntityAndVoteAndFavoritesInfo",init)
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
$(".js_job").click(function(){
  if(!ticketsSalt || !ticket){
    popupType = 2;
    showPopup("请先登录！",1)
    return;
  }
  postCallBack({jid:search.jid},"/dabai-chaorenjob/resumeReceived/voteResume",job)
})
function job(res){
  if(res.code == 1){
    popupType = 1;
    showPopup("投递成功!")
    $(".job_btn").addClass("is_active").removeClass("js_job").text("已投递")
  }else if(res.code == 10001){
    popupType = 2;
    showPopup("请先登录")
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else if(res.code == 10030){
    popupType = 1;
    showPopup(res.msg,1)
  }else if(res.code == 10004){
    popupType = 3;
    showPopup("请您提交实名认证！审核通过后可投递简历",1)
  }else if(res.code == 10005){
    popupType = 4;
    showPopup("您的实名认证未通过审核，请修改！审核通过后可投递简历",1)
  }else if(res.code == 10006){
    popupType = 5;
    showPopup("您的实名认证正在审核中！审核通过后可投递简历",1)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".popup_err").click(function(){
  hidePopup()
})
$(".popup_suc").click(function(){
  switch (popupType){
    case 1:
      window.location.href = "stepOne.html?type=1"
      break;
    case 2:
      window.location.href = "login.html"
      break;
    case 3:
      window.location.href = "realName.html"
      break;
    case 4:
      window.location.href = "realName.html"
      break;
    case 5:
      window.location.href = "realName.html"
      break;
  }
})
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