var popupType;
var loadFlag = true;
var _start = 1;
init();
function init(){
  var dataPost = {
    _limit: pageSize,
    _start:_start
  }
  getCallBack(dataPost,'/dabai-chaorenjob/favorites/getJobFavoritesList',initList)
}
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
        '</span></div><div class="job_company"><div class="company_info"><a href="companyInfo.html?type=2&cid=' +
        dataList[i].cid +
        '" class="company_logo"><img src="' +
        dataList[i].logoUrl +
        '" alt=""/></a><div class="company_name wrap">' +
        dataList[i].name_short +
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
    }else if(_start == 1){
      html = '<div class="no_data"><img src="img/no_data_3.jpg" alt=""/></div>'
      $(".g_container").append(html)
      $(".job_list").html("")
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
$(".job_list").on("click",".job_item",function(){
  window.location.href = "jobDetail.html?type=2&jid="+$(this).attr("data-jid")
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
        init();
      }else{
        mySwiper.update(); // 重新计算高度;
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