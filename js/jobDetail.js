var search =  url_analysis(window.location.search);
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
  }
  console.log(res)
}
$(".see_info").click(function(){
  window.location.href = "companyInfo.html?cid="+$(this).attr("data-cid")
})