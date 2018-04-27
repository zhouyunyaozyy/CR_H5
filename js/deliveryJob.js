getCallBack({},"/dabai-chaorenjob/resumeReceived/getMyVoteList",jobList)
function jobList(res){
  if(res.code == 1){
    var data = res.data.data;
    var html = '';
    for(var i = 0;i< data.length;i++){
      html += '<div class="job_item"><div class="job_title"><span class="title_txt wrap">' +
      data[i].job_name +
      '</span><span class="job_state_bg"></span><span class="job_state">' +
      formatData(data[i].status,'overVoteStatusEnum') +
      '</span></div><div class="job_label"><span class="label_address"><i class="iconfont icon-dizhi"></i>' +
      address(data[i].address,2) +
      '</span><span class="label_exp"><i class="iconfont icon-gongzuojingyan"></i>' +
      formatData(data[i].work_experience,"jobExperience") +
      '</span><span class="label_money"><i class="iconfont icon-icon-test1"></i>' +
      formatData(data[i].wages,"wages") +
      '</span></div><div class="job_company"><div class="company_info"><div class="company_logo"><img src="' +
      data[i].logoUrl +
      '" alt=""/></div><div class="company_name wrap">' +
      data[i].conpany_name +
      '</div><div class="company_state"><i class="iconfont icon-v"></i>已授权</div></div><div class="job_time">' +
      formatDate(data[i].issue_time,1) +
      '</div></div></div>'
    }
    $(".job_list").html(html)
  }
  console.log(res)
}