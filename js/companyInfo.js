var search =  url_analysis(window.location.search);
$(".back").attr("href","jobDetail.html?jid="+window.sessionStorage.getItem("jid"))
getCallBack({cid:search.cid},"/dabai-chaorenjob/company/getCompanyInfoAndJobs",init)
function init(res){
  if(res.code == 1){
    if(res.data.imagesUrl.length > 0){
      var img_html = "";
      for(var i = 0; i<res.data.imagesUrl.length;i++){
        img_html+= '<img src="' +
        res.data.imagesUrl[i] +
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
    $(".job_info_name").text(res.data.name_full)
    $(".job_info_logo img").attr("src",res.data.logoUrl)
    $(".js_abbr").text(res.data.name_short)
    $(".js_nature").text(formatData(res.data.character,"character"))
    $(".js_scale").text(formatData(res.data.fleet_size,"fleet_size"))
    $(".js_web").text(res.data.website)
    $(".js_address").text(res.data.address)
    $(".js_phone").text(res.data.tel)
    $(".company_introduce").text(res.data.profile)
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
    $(".job_list").html(html)
  }
  console.log(res)
}
$(".job_list").on("click",".job_item",function(){
  window.location.href = "jobDetail.html?jid="+$(this).attr("data-jid")
})