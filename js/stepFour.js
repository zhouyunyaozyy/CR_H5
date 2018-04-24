getCallBack({},"/dabai-chaorenjob/common/qiniu/token",initToken)
getCallBack({},"/dabai-chaorenjob/resume/getVideoProfile",videoInfo)
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var target,znConfig;
var imgToken,videoKey;
function initToken(res){
  if(res.code == 1){
    imgToken = res.data;
  }
  console.log(res)
}
function videoInfo(res){
  if(res.code == 1){
    var obj = JSON.parse(res.data)
    $(".four_video_item").text(obj.rule);
    //$(".yourself_cont").text(obj.howIntroduce);
  }
  console.log(res)
}
function initResume(res){
  if(res.code == 1){
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
  }
  console.log(res)
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
  }
}
$('.four_video_cont').on("change",".btn_file",function(){
  var formData = new FormData();
  var val = this.value.slice(-4);
  console.log(val)
  if (val == '.mp4' || val== '.MP4') {
    this.select();
    var obj = this.files[0];
    console.log(321)
    //file = obj;
    //var fr = new FileReader();
    //fr.onload = function () {
    //  $(ipt).prev("img").attr("src",this.result);
    //};
    //fr.readAsDataURL(obj);
  } else {
    alert("请选择mp4格式视频文件")
  }
  formData.append('token', imgToken);
  formData.append('file', obj);
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
  }
  console.log(res)
}
$(".js_delete").click(function(){
  var html = '<i class="iconfont icon-tianjia1"></i><input type="file" accept="video/mp4" class="btn_file"/>'
  $(".four_video_show").html(html)
  $(".three_edit .btn_file").remove();
  $(".four_video_btn").css("display","none")
})
$(".js_four").click(function(){
  console.log(znConfig)
  if(znConfig.video && !videoKey){
    return;
  }else if(!videoKey){
    window.location.href = "stepFive.html"
  }else{
    postCallBack({video:videoKey},"/dabai-chaorenjob/resume/updateVideoResume",videoUpdate)
  }
})
function videoUpdate(res){
  if(res.code == 1){
    window.location.href = "stepFive.html"
  }
  console.log(res)
}