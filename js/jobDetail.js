var search =  url_analysis(window.location.search);
var isFavorites;
getCallBack({jid:search.jid},"/dabai-chaorenjob/job/getJobEntityAndVoteAndFavoritesInfo",init)
function init(res){
  if(res.code == 1){
    $(".job_name").text(res.data.name_full)
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
  }
  console.log(res)
}
$(".see_info").click(function(){
  window.sessionStorage.setItem("jid",search.jid)
  window.location.href = "companyInfo.html?cid="+$(this).attr("data-cid")
})
$('.js_collect').click(function(){
  var url;
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
  }
}
$(".js_job").click(function(){
  postCallBack({jid:search.jid},"/dabai-chaorenjob/resumeReceived/voteResume",job)
})
function job(res){
  if(res.code == 1){
    $(".job_btn").addClass("is_active").removeClass("js_job").text("已投递")
  }
  console.log(res)
}