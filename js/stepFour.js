var search = url_analysis(window.location.search)
getCallBack({},"/dabai-chaorenjob/common/qiniu/token",initToken)
getCallBack({},"/dabai-chaorenjob/resume/getVideoProfile",videoInfo)
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var target,znConfig,popupType;
var imgToken,videoKey;
function initToken(res){
  if(res.code == 1){
    imgToken = res.data;
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
function videoInfo(res){
  if(res.code == 1){
    var obj = JSON.parse(res.data)
    $(".four_video_item").text(obj.rule);
    //$(".yourself_cont").text(obj.howIntroduce);
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
function initResume(res){
  console.log(res)
  if(res.code == 1){
    if(search.type != 1){
      switch (res.data.steps){
        case 100:
          popupType = 3;
          showPopup("请先填写第一步")
          return;
        case 200:
          popupType = 4;
          showPopup("请先填写第二步")
          return;
        case 300:
          popupType = 5;
          showPopup("请先填写第三步")
          return;
        case 700:
          popupType = 8;
          showPopup("请修改原简历，不能新增简历")
          return;
      }
    }else{
      $(".back").attr("href","modifyResume.html")
      $(".title").text("视频形象")
      $(".js_four").text("确认")
    }
    target = res.data.target;
    getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc)
    if(res.data.video){
      videoKey = res.data.video;
      var html = '<video src="' +
        res.data.videoUrl +
        '" controls="controls"></video>'
      $(".four_video_show").html(html)
      $(".three_edit .icon-bianji").after('<input type="file" accept="video/mp4" class="btn_file"/>')
      $(".four_video_btn").css("display","flex")
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
}
function initFuc(res){
  if(res.code == 1){
    for(var i = 0;i < res.data.length;i++){
      if(res.data[i].rtid == target){
        znConfig = JSON.parse(res.data[i].config)
        console.log(znConfig)
        if(znConfig.video){
          $(".video_title").removeClass("optional").find("span").text("(必填)")
        }else{
          $(".video_title").addClass("optional").find("span").text("(选填)")
        }
        return;
      }
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
}
$('.four_video_cont').on("change",".btn_file",function(){
  var formData = new FormData();
  var val = this.value.slice(-4);
  console.log(val)
  if (val == '.mp4' || val== '.MP4') {
    this.select();
    var obj = this.files[0];
    //file = obj;
    //var fr = new FileReader();
    //fr.onload = function () {
    //  $(ipt).prev("img").attr("src",this.result);
    //};
    //fr.readAsDataURL(obj);
  } else {
    popupType = 1
    showPopup("请选择mp4格式视频文件")
  }
  formData.append('token', imgToken);
  formData.append('file', obj);
  formData.append('persistentOps', "vframe/jpg/offset/7/w/480/h/360");
  $.ajax({
    type: "POST",
    url:"http://upload-z2.qiniu.com",
    data: formData,
    contentType : false,
    processData : false,
    success:function(res){
      getCallBack({},"/dabai-chaorenjob/common/qiniu/url/"+res.key,showImg,res.key)
      console.log(res)
    }
  })
})
function showImg(res,key){
  if(res.code == 1){
    videoKey = key;
    var html = '<video src="' +
      res.data +
      '" controls="controls"></video>'
    $(".four_video_show").html(html)
    $(".three_edit .icon-bianji").after('<input type="file" accept="video/mp4" class="btn_file"/>')
    $(".four_video_btn").css("display","flex")
    //var video, output;
    //video = $(".four_video_show video")[0];
    //video.addEventListener('loadeddata',captureImage(video));
    //poster="' +
    //res.data +
    //'?vframe/jpg/offset/0' +
    //'"
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
setTimeout(captureImage,5000)
function captureImage () {
  var video = $(".four_video_show video")[0];
  var output = $(".g_container")[0]
  console.log(video)
  var scale = 0.8;
  var imga = document.createElement("img");
  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // 设置动态添加的元素的样式
  //imga.className='all';
  imga.setAttribute('crossOrigin', 'anonymous');
   //alert(canvas.toDataURL("image/png"));
  imga.src = canvas.toDataURL("image/png");
  console.log(canvas.toDataURL("image/png"))
  video.poster=imga.src;
  output.appendChild(imga);
  output.appendChild(canvas);
};
$(".js_delete").click(function(){
  var html = '<i class="iconfont icon-tianjia1"></i><input type="file" accept="video/mp4" class="btn_file"/>'
  $(".four_video_show").html(html)
  $(".three_edit .btn_file").remove();
  $(".four_video_btn").css("display","none")
})
var updateState = 0;
$(".js_four").click(function(){
  if(updateState === 0){
    updateState = 1;
  }else{
    popupType = 1;
    showPopup("信息验证中请耐心等待。。。")
    return;
  }
  if(znConfig.video && !videoKey){
    popupType = 1;
    showPopup("请上传视频形象")
    return;
  }else if(!znConfig.video){
    postCallBack({steps:500},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
  }else{
    postCallBack({video:videoKey},"/dabai-chaorenjob/resume/updateVideoResume",videoUpdate)
  }
})
function videoUpdate(res){
  if(res.code == 1){
    if(search.type == 1){
      window.location.href = "modifyResume.html"
    }else{
      postCallBack({steps:500},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
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
function updateSteps(res){
  if(res.code == 1){
    window.location.href = "stepFive.html"
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
$(".popup_hide").click(function(){
  switch (popupType){
    case 1:
      hidePopup()
      break;
    case 2:
      window.location.href = "login.html"
      break;
    case 3:
      window.location.href = "stepOne.html"
      break;
    case 4:
      window.location.href = "stepTwo.html"
      break;
    case 5:
      window.location.href = "stepThree.html"
      break;
    case 8:
      window.location.href = "resumeDetail.html"
      break;
    default :
      hidePopup()
      return;
  }
})
$(".js_back").click(function(){
  showPopup("内容未保存,返回将导致内容丢失，是否确认返回？",1)
})
$(".popup_suc").click(function(){
  window.location.href = "stepThree.html"
})
$(".popup_err").click(function(){
  hidePopup()
})