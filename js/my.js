var popupType;
var imgToken;
getCallBack({}, "/dabai-chaorenjob/common/qiniu/token", initToken)
getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
getCallBack({},"/dabai-chaorenjob/resume/getResumeSteps",initState)
function isReal(res){
  if(res.code == 1){
    if(!res.data){
      popupType = 1;
      showPopup("请先填写简历并提交审核")
    }else{
      window.location.href = "realName.html"
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
$(".top").on("click",".auth_state",function(){
  getCallBack({},"/dabai-chaorenjob/resumeAuditSnapshot/getMyResumeAudit",isReal)
})
function initToken(res) {
  if (res.code == 1) {
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
function initMy(res){
  if(res.code == 1){
    if(res.data.headerUrl){
      $(".top_avatar img").attr("src",res.data.headerUrl)
    }
    $(".user_phone").text(res.data.mobile)
    if(res.data.name){
      $(".user_phone").before('<div class="user_name">' + res.data.name + '</div>')
    }
    getCallBack({uid:res.data.uid},"/dabai-chaorenjob/certification/queryCheckStatus",userState)
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
function userState(res){
  if(res.code == 1){
    var html = '';
    if(!res.data || res.data != 4){
      html = '<div class="auth_state">未认证</div>'
    }else if(res.data == 4){
      html = '<div class="auth_state auth_ok"><i class="iconfont icon-v"></i>认证</div>'
    }
    $(".top_avatar").after(html)
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
function initState(res){
  if(res.code == 1){
    switch (res.data){
      case 200:
        $(".resume_scale").attr("href","stepTwo.html")
        break;
      case 300:
        $(".resume_scale").attr("href","stepThree.html")
        break;
      case 400:
        $(".resume_scale").attr("href","stepFour.html")
        break;
      case 500:
        $(".resume_scale").attr("href","stepFive.html")
        break;
      case 600:
        $(".resume_scale").attr("href","stepSix.html")
        break;
      case 700:
        getCallBack({},"/dabai-chaorenjob/resumeAuditSnapshot/getMyResumeAudit",isAudit)
        break;
      default:
        $(".resume_scale").attr("href","resumeFill.html")
        break;
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
function isAudit(res){
  if(res.code == 1){
    switch (res.data.status){
      case 1:
        $(".resume_scale").attr("href","resumeDetail.html")
        break;
      case 4:
        $(".resume_scale").attr("href","resumeDetail.html")
        break;
      case 8:
        $(".resume_scale").attr("href","resumeDetail.html")
        break;
      default:
        $(".resume_scale").attr("href","stepSix.html")
        break;
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
$(".download_close").click(function(){
  $(".download_cont").animate({
    width: "0px"
  })
})
//cutImg
//建立一個可存取到該file的url
function getObjectURL(file) {
  var url = null ;
  if (window.createObjectURL!=undefined) { // basic
    url = window.createObjectURL(file) ;
  } else if (window.URL!=undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file) ;
  } else if (window.webkitURL!=undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file) ;
  }
  return url ;
}
$('.close').click(function(){
  $('.img-container').hide();
})
function convertToData(url, canvasdata, cropdata, callback) {
  var cropw = cropdata.width; // 剪切的宽
  var croph = cropdata.height; // 剪切的宽
  var imgw = canvasdata.width; // 图片缩放或则放大后的高
  var imgh = canvasdata.height; // 图片缩放或则放大后的高
  var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置
  var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  canvas.width = cropw;
  canvas.height = croph;
  var img = new Image();
  img.src = url;
  img.onload = function() {
    this.width = imgw;
    this.height = imgh;
    // 这里主要是懂得canvas与图片的裁剪之间的关系位置
    ctx.drawImage(this, poleft, potop, this.width, this.height);
    var base64 = canvas.toDataURL('image/jpg', 1);  // 这里的“1”是指的是处理图片的清晰度（0-1）之间，当然越小图片越模糊，处理后的图片大小也就越小
    callback && callback(base64)      // 回调base64字符串
  }
}
$(function(){
  var $image = $('.img-container > img');
  var options = {
    dragCrop:false,
    aspectRatio: 1 / 1  　　// 1：1的比例进行裁剪，可以是任意比例，自己调整
  }
  var blobURL;
  var size;
  $(".avatar_file").change(function(){
    var objUrl = getObjectURL(this.files[0]) ;
    if(objUrl){
      $("#cutImg").attr("src", objUrl) ;
      size = this.files[0].size;
      blobURL = objUrl;
      console.log("objUrl = "+objUrl) ;
      $image.one('built.cropper', function (e) {
        $('.img-container').show();
      }).cropper('reset', true).cropper('replace', blobURL)
      $(this).val("")
    }
  });
  $image.on({
    'build.cropper': function (e) {
      console.log(e.type);
    },
    'built.cropper': function (e) {
      console.log(e.type);
    },
    'dragstart.cropper': function (e) {
      console.log(e.type, e.dragType);
    },
    'dragmove.cropper': function (e) {
      console.log(e.type, e.dragType);
    },
    'dragend.cropper': function (e) {
      console.log(e.type, e.dragType);
    },
    'zoomin.cropper': function (e) {
      console.log(e.type);
    },
    'zoomout.cropper': function (e) {
      console.log(e.type);
    }
  }).cropper(options);
  // 点击保存
  $(".saveBtn").on("click", function() {
    console.log($image)
    var src = $image.attr("src");
    console.log($($image).attr("src"))
    var canvasdata = $image.cropper("getCanvasData");
    var cropBoxData = $image.cropper('getCropBoxData');
    convertToData(src, canvasdata, cropBoxData, function(basechar) {
      // 回调后的函数处理
      console.log(basechar)
      var str = basechar.substring(22);
      //putb64(str,size)
      $.ajax({
        type: "POST",
        url: "http://upload-z2.qiniu.com/putb64/-1",
        headers:{
          "Content-Type": "application/octet-stream",
          "Authorization": "UpToken "+imgToken
        },
        data: str,
        success: function (res) {
          if(res.key){
            postCallBack({header:res.key},"/dabai-chaorenjob/seeker/updateUserSeekerHeader",changeHeader)
          }
          console.log(res)
        }
      })
    });
  })
})
function changeHeader(res){
  if(res.code == 1){
    $(".avatar_img").attr("src",res.data)
    $('.img-container').hide();
    showFloat("上传成功",1);
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
//function putb64(base64){
//  var pic = base64;
//  var url = "http://upload-z2.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
//  var xhr = new XMLHttpRequest();
//  xhr.onreadystatechange=function(){
//    if (xhr.readyState==4){
//      console.log(xhr.responseText);
//    }
//  }
//  xhr.open("POST", url, true);
//  xhr.setRequestHeader("Content-Type", "application/octet-stream");
//  xhr.setRequestHeader("Authorization", "UpToken "+imgToken);
//  xhr.send(pic);
//}