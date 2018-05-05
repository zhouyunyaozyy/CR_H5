var search =  url_analysis(window.location.search);
var popupType;
var loadFlag = true;
var _start = 1;
if(search.type == 1){
  $(".back").attr("href","index.html")
}else if(search.type == 2){
  $(".back").attr("href","jobCollect.html")
}else if(search.type == 3){
  $(".back").attr("href","deliveryJob.html")
}else if(search.type == 4){
  $(".back").attr("href","deliveryDetail.html?rrid="+search.rrid)
}else if(window.sessionStorage.getItem("jid")){
  $(".back").attr("href","jobDetail.html?jid="+window.sessionStorage.getItem("jid"))
}else{
  $(".back").attr("href","index.html")
}
init();
function init(){
  var postData = {
    cid:search.cid,
    _limit: 15,
    _start:_start
  }
  getCallBack(postData,"/dabai-chaorenjob/company/getCompanyInfoAndJobs",initInfo)
}
function initInfo(res){
  if(res.code == 1){
    if(_start == 1){
      if(res.data.imagesUrl.length > 0){
        var img_html = "";
        for(var i = 0; i<res.data.imagesUrl.length;i++){
          img_html+= '<img src="' +
          res.data.imagesUrl[i] +
          '" alt="" class="swiper-slide"/>'
        }
        $(".banner .swiper-wrapper").html(img_html)
        var swiper = new Swiper('.banner .swiper-container', {
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
      $(".job_info_name").text(res.data.name_full)
      $(".job_info_logo img").attr("src",res.data.logoUrl)
      $(".js_abbr").text(res.data.name_short)
      $(".js_nature").text(formatData(res.data.character,"character"))
      $(".js_scale").text(formatData(res.data.fleet_size,"fleet_size"))
      $(".js_web").text(res.data.website)
      $(".js_address").text(res.data.address)
      $(".js_phone").text(res.data.tel)
      $(".company_introduce").text(res.data.profile)
    }
    var dataList = res.data.jobs.data;
    var html = '';
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
      res.data.logoUrl +
      '" alt=""/></div><div class="company_name wrap">' +
      res.data.name_full +
      '</div><div class="company_state"><i class="iconfont icon-v"></i>已授权</div></div><div class="job_time">' +
      formatDate(dataList[i].issue_time,1) +
      '</div></div></div>'
    }
    if(dataList.length < 15){
      loadFlag = false;
    }
    if(_start > 1){
      $(".job_list").append(html)
    }else{
      $(".job_list").html(html)
    }
    mySwiper.update(); // 重新计算高度;
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
$(".download_close").click(function(){
  $(".download_cont").animate({
    width: "0px"
  })
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
var mySwiper = new SwiperScroll('.g_container',{
  direction: 'vertical',
  scrollbar: '.swiper-scrollbar',
  slidesPerView: 'auto',
  mousewheelControl: true,
  freeMode: true,
  onTouchMove: function(swiper){		//手动滑动中触发
    var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
    var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
    if(mySwiper.translate < 50 && mySwiper.translate > 0) {
      $(".init-loading").html('下拉刷新...').show();
    }else if(mySwiper.translate > 50 ){
      $(".init-loading").html('释放刷新...').show();
    }
  },
  onTouchEnd: function(swiper) {
    var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
    var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
    // 上拉加载
    if(mySwiper.translate <= _viewHeight - _contentHeight - 50 && mySwiper.translate < 0) {
      if(loadFlag){
        _start = _start + 1
        console.log(loadFlag,_start)
        init();
      }else{
        popupType = 1;
        showPopup("已无更多数据")
      }
    }
    // 下拉刷新
    if(mySwiper.translate >= 50) {
      loadFlag = true;
      _start = 1;
      console.log(loadFlag,_start)
      init();
      $(".init-loading").html('刷新成功！');
      setTimeout(function(){
        $(".init-loading").html('').hide();
      },800);
    }else if(mySwiper.translate >= 0 && mySwiper.translate < 50){
      $(".init-loading").html('').hide();
    }
    return false;
  }
});