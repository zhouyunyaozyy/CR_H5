var popupType;
getCallBack({},'/dabai-chaorenjob/favorites/getJobFavoritesList',initList)
function initList(res){
  if(res.code == 1){
    var dataList = res.data.data;
    var html = '';
    if(dataList.length > 0){
      for(var i = 0;i<dataList.length;i++){
        html += '<div class="job_item" data-jid="' +
        dataList[i].oid +
        '"><div class="job_title">' +
        dataList[i].name +
        '</div><div class="job_label"><span class="label_address"><i class="iconfont icon-dizhi"></i>' +
        address(dataList[i].address+"",2) +
        '</span><span class="label_exp"><i class="iconfont icon-gongzuojingyan"></i>' +
        formatData(dataList[i].work_experience,"jobExperience") +
        '</span><span class="label_money"><i class="iconfont icon-icon-test1"></i>' +
        formatData(dataList[i].wages,"wages") +
        '</span></div><div class="job_company"><div class="company_info"><div class="company_logo"><img src="' +
        dataList[i].logoUrl +
        '" alt=""/></div><div class="company_name wrap">' +
        dataList[i].name_short +
        '</div><div class="company_state"><i class="iconfont icon-v"></i>已授权</div></div><div class="job_time">' +
        formatDate(dataList[i].issue_time,1) +
        '</div></div></div>'
      }
    }else{
      html = '<div class="no_data"><img src="img/no_data_3.jpg" alt=""/></div>'
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
  window.location.href = "jobDetail.html?jid="+$(this).attr("data-jid")
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