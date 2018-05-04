var search = url_analysis(window.location.search)
var popupType;
init();
function init(){
  var dataPost = {}
  if(search.type == 1){
    $(".tab_item").eq(1).addClass("is_active")
    dataPost.status = 2;
  }else if(search.type == 2){
    $(".tab_item").eq(2).addClass("is_active")
    dataPost.status = 3;
  }else if(search.type == 3){
    $(".tab_item").eq(3).addClass("is_active")
    dataPost.status = 4;
  }else{
    $(".tab_item").eq(0).addClass("is_active")
  }
  getCallBack(dataPost,"/dabai-chaorenjob/resumeReceived/getMyVoteList",jobList)
}
function jobList(res){
  console.log(31)
  if(res.code == 1){
    var data = res.data.data;
    var html = '';
    if(data.length > 0){
      for(var i = 0;i< data.length;i++){
        html += '<div class="job_item" data-rrid="' +
        data[i].rrid +
        '"><div class="job_title"><span class="title_txt wrap">' +
        data[i].job_name +
        '</span><span class="job_state_bg"></span><span class="job_state">' +
        formatData(data[i].status,'userDeliveryState') +
        '</span></div><div class="job_label"><span class="label_address"><i class="iconfont icon-dizhi"></i>' +
        address(data[i].address,2) +
        '</span><span class="label_exp"><i class="iconfont icon-gongzuojingyan"></i>' +
        formatData(data[i].work_experience,"jobExperience") +
        '</span><span class="label_money"><i class="iconfont icon-icon-test1"></i>' +
        formatData(data[i].wages,"wages") +
        '</span></div><div class="job_company"><div class="company_info"><div class="company_logo"><img src="' +
        data[i].logoUrl +
        '" alt=""/></div><div class="company_name wrap">' +
        data[i].name_short +
        '</div><div class="company_state"><i class="iconfont icon-v"></i>已授权</div></div><div class="job_time">' +
        formatDate(data[i].issue_time,1) +
        '</div></div></div>'
      }
    }else{
      html = '<div class="no_data"><img src="img/no_data_2.jpg" alt=""/></div>'
    }
    $(".job_list").html(html)
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
$(".job_list").on("click",".job_item",function(){
  window.location.href = "deliveryDetail.html?rrid=" + $(this).attr("data-rrid")
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