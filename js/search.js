var popupType;
$(".search_btn").click(function(){
  var keyword = $(".search_txt").val();
  if(keyword){
    getCallBack({keyword:keyword},"/dabai-chaorenjob/company/searchCompanyAndJob",getSearch)
  }else{
    popupType = 1;
    showPopup("请输入搜索关键字")
  }
})
function historyinit(){
  var historyList = window.localStorage.getItem("historyList");
  if(historyList){
    historyList = historyList.split("^&$")
  }else{
    historyList = [];
  }
  var historyHtml = "";
  for(var i = 0;i<historyList.length;i++){
    historyHtml += '<div class="history_item">' +
    historyList[i] +
    '</div>'
  }
  $(".history_list").html(historyHtml)
}
historyinit();
function getSearch(res){
  if(res.code == 1){
    var historyList = window.localStorage.getItem("historyList");
    if(historyList){
      historyList = historyList.split("^&$")
    }else{
      historyList = [];
    }
    var historyArr = [];
    var keyword = $(".search_txt").val();
    if(historyList.length == 0){
      historyArr.push(keyword)
    }else{
      for(var h = 0;h<historyList.length;h++){
        if(historyList[h] && historyList[h] != keyword){
          historyArr.push(historyList[h])
        }else if(historyList[h] && historyList[h] == keyword){
          historyArr.push(historyList[h])
          keyword = "";
        }
      }
      if(keyword){
        historyArr.push(keyword)
      }
    }
    window.localStorage.setItem("historyList",historyArr.join("^&$"))
    var total = 0;
    if(res.data.job.data.length > 0){
      var dataList = res.data.job.data;
      var jobHTml = "";
      total += dataList.length
      for(var i = 0;i<dataList.length;i++){
        jobHTml += '<div class="job_item" data-jid="' +
        dataList[i].jid +
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
      $(".job_list").html(jobHTml)
    }else{
      $(".job_list").css("display","none").prev(".search_type").css("display","none")
    }
    if(res.data.company.data.length > 0){
      var companyList = res.data.company.data;
      var companyHTml = "";
      total += companyList.length
      for(var c = 0; c <companyList.length;c++){
        companyHTml += '<div class="company_item" data-cid="' +
        companyList[c].cid +
        '"><div class="company_item_logo"><img src="' +
        companyList[c].logoUrl   +
        '" alt=""/></div><div class="company_item_cont"><div class="company_item_name"><div class="company_item_label wrap">' +
        companyList[c].name_full +
        '</div><div class="company_item_state"><i class="iconfont icon-v"></i>已授权</div></div><div class="company_item_info"><span class="company_type">' +
        formatData(companyList[c].character,"character") +
        '</span>|<span class="company_scale">' +
        formatData(companyList[c].fleet_size,"fleet_size") +
        '架</span> </div></div></div>'
      }
      $(".company_list").html(companyHTml)
    }else{
      $(".company_list").css("display","none").prev(".search_type").css("display","none")
    }
    $(".search_total span").text(total)
    $(".history_cont").addClass("is_hide")
    $(".search_cont").removeClass("is_hide")
    return;
  }else if(res.code == 10001){
    popupType = 2;
    showPopup(res.msg)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup(res.msg)
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  $(".search_cont").addClass("is_hide")
  $(".history_cont").removeClass("is_hide")
  console.log(res)
}
$(".history_list").on("click",".history_item",function(){
  var keyword = $(this).text();
  $(".search_txt").val(keyword);
  getCallBack({keyword:keyword},"/dabai-chaorenjob/company/searchCompanyAndJob",getSearch)
})
$(".history_clear").click(function(){
  window.localStorage.setItem("historyList","")
  $(".history_list").html("")
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