var popupType;
getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc)
getCallBack({},"/dabai-chaorenjob/banner/indexBanner",initBanner)
init();
function init(){
  var postData = {
    rtid: $(".head_job_name span").attr("data-rtid")
  }
  getCallBack(postData,'/dabai-chaorenjob/job/queryIndexJobList',initList)
}
function initBanner(res){
  console.log(res)
  if(res.code == 1){
    if(res.data.length > 0){
      var img_html = "";
      for(var i = 0; i<res.data.length;i++){
        img_html+= '<img data-type="' +
        res.data[i].type +
        '" data-args="' +
        res.data[i].args +
        '" data-title="' +
        res.data[i].title +
        '" src="' +
        res.data[i].imagesUrl+
        '" alt="" class="swiper-slide"/>'
      }
      $(".swiper-wrapper").html(img_html)
      var swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
}
function initFuc(res){
  if(res.code == 1){
    var html = '<i></i><div class="head_job_item is_active" data-rtid="">全部</div>';
    for(var i = 0;i<res.data.length;i++){
      html += '<div class="head_job_item" data-rtid="' +
      res.data[i].rtid +
      '">' +
      res.data[i].name +
      '</div>'
    }
    $(".head_job_cont").html(html)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function initList(res){
  if(res.code == 1){
    var dataList = res.data.data;
    var html = '';
    if(dataList.length > 0){
      for(var i = 0;i<dataList.length;i++){
        html += '<div class="job_item" data-jid="' +
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
    }else{
      html = '<div class="no_data"><img src="img/no_data_1.jpg" alt=""/></div>'
    }
    $(".job_list").html(html)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".swiper-wrapper").on("click",".swiper-slide",function(){
  var type = parseInt($(this).attr("data-type"));
  var args = $(this).attr("data-args");
  switch (type){
    case 1:
      window.location.href = args;
      break;
    case 2:
      window.location.href = args;
      break;
    case 3:
      window.location.href = "jobDetail.html?jid=" + args;
      break;
    case 4:
      window.location.href = "companyInfo.html?cid=" + args;
      break;
    case 5:
      var title = $(this).attr("data-title");
      window.sessionStorage.setItem("args",args)
      window.sessionStorage.setItem("title",title)
      window.location.href = "textHtml.html"
      break;
    case 6:
      window.location.href = locationIp + "/dabai-page/news/detail/" + args;
      break;
  }
})
$(".job_list").on("click",".job_item",function(){
  window.location.href = "jobDetail.html?jid="+$(this).attr("data-jid")
})
$(".head_job_name").click(function(){
  $(".head_job_cont").toggleClass("is_show")
})
$(".head_job_cont").on("click",".head_job_item",function(){
  $(this).addClass("is_active").siblings(".is_active").removeClass("is_active")
  $(".head_job_name span").text($(this).text()).attr("data-rtid",$(this).attr("data-rtid"))
  $(".head_job_cont").removeClass("is_show")
  init();
})
$(".head_my").click(function(){
  if(!ticketsSalt || !ticket){
    showPopup("请先登录！",1)
  }else{
    window.location.href = "my.html"
  }
})
$(".popup_err").click(function(){
  hidePopup()
})
$(".popup_suc").click(function(){
  window.location.href = "login.html"
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