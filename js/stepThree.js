var search = url_analysis(window.location.search)
var popupType;
getCallBack({}, "/dabai-chaorenjob/common/qiniu/token", initToken)
getCallBack({}, "/dabai-chaorenjob/resume/getMyResumeVo", initResume)
var target, znConfig;
var imgNum = 0;
var imgToken;
var threeStep = 0;
var imgType;
function initToken(res) {
  if (res.code == 1) {
    imgToken = res.data;
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function initResume(res) {
  if (res.code == 1) {
    if (search.type != 1 && search.type != 2) {
      switch (res.data.steps) {
        case 100:
          popupType = 3;
          showPopup("请先填写第一步")
          return;
        case 200:
          popupType = 4;
          showPopup("请先填写第二步")
          return;
        case 700:
          popupType = 8;
          showPopup("请修改原简历，不能新增简历")
          return;
      }
    }
    target = res.data.target;
    getCallBack({}, '/dabai-chaorenjob/resumeTarget/getActiveResumeTarget', initFuc)
    if (search.type != 2 && res.data.headerUrl) {
      var headerHtml = ""
      headerHtml += '<div class="three_img_item"><div class="three_img_cont"><img data-key="' +
      res.data.header +
      '" src="' +
      res.data.headerUrl +
      '" alt=""/></div><span class="three_edit"><i class="iconfont icon-bianji"></i>' +
      '<input class="btn_file js_edit" accept="image/png, image/jpeg" type="file"/></span>' +
      '<span class="three_delete js_delete"><i class="iconfont icon-shanchu"></i></span></div>'
      $(".three_standard_img .three_img_list").html(headerHtml)
    }
    if (search.type != 1 && res.data.imagesUrl.length > 0) {
      imgNum = res.data.imagesUrl.length
      var imgArr = res.data.images.split(",")
      var imagesHtml = ""
      for (var i = 0; i < res.data.imagesUrl.length; i++) {
        imagesHtml += '<div class="three_img_item"><div class="three_img_cont"><img data-key="' +
        imgArr[i] +
        '" src="' +
        res.data.imagesUrl[i] +
        '" alt=""/></div><span class="three_edit"><i class="iconfont icon-bianji"></i>' +
        '<input class="btn_file js_edit" accept="image/png, image/jpeg" type="file"/></span>' +
        '<span class="three_delete js_delete"><i class="iconfont icon-shanchu"></i></span></div>'
      }
      $(".three_photo_img .three_img_add").before(imagesHtml)
    }
    if (search.type == 1) {
      $(".photo_title").remove();
      $(".three_photo_img").remove();
      $(".back").attr("href", "modifyResume.html")
      $(".title").text("标准照")
      $(".js_three").text("确认")
    } else if (search.type == 2) {
      $(".header_title").remove();
      $(".three_standard_img").remove();
      $(".back").attr("href", "modifyResume.html")
      $(".title").text("图片形象")
      $(".js_three").text("确认")
    }
  }
  console.log(res)
}
function initFuc(res) {
  if (res.code == 1) {
    for (var i = 0; i < res.data.length; i++) {
      switch (res.data[i].rtid) {
        case target:
          znConfig = JSON.parse(res.data[i].config)
          if (znConfig.images) {
            $(".photo_title").removeClass("optional").find("span").text("(必填)")
          } else {
            $(".photo_title").addClass("optional").find("span").text("(选填)")
          }
          break;
      }
      console.log(target, res.data[i].rtid, target == res.data[i].rtid)
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
}
function update(ipt, cType) {
  var formData = new FormData();
  var val = ipt.value.slice(-4);
  if (val == '.jpg' || val == '.png' || val == 'jpeg' || val == '.JPG' || val == '.PNG' || val == 'JEPG') {
    ipt.select();
    var obj = ipt.files[0];
  } else {
    popupType = 1;
    showPopup("请选择jpg或png格式图片")
  }
  formData.append('token', imgToken);
  formData.append('file', obj);
  $.ajax({
    type: "POST",
    url: "http://upload-z2.qiniu.com",
    data: formData,
    contentType: false,
    processData: false,
    success: function (res) {
      if (cType == 1) {
        getCallBack({}, "/dabai-chaorenjob/common/qiniu/url/" + res.key, changeImg, {ipt: ipt, key: res.key})
      } else {
        getCallBack({}, "/dabai-chaorenjob/common/qiniu/url/" + res.key, showImg, res.key)
      }
      console.log(res)
    }
  })
}
function changeImg(res, obj) {
  if(res.code == 1){
    $(obj.ipt).parent().prev().find("img").attr({
      "src": res.data,
      "data-key": obj.key
    })
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
}
function showImg(res, key) {
  if (res.code == 1) {
    var html = "";
    html += '<div class="three_img_item"><div class="three_img_cont"><img data-key="' +
    key +
    '" src="' +
    res.data +
    '" alt=""/></div><span class="three_edit"><i class="iconfont icon-bianji"></i>' +
    '<input class="btn_file js_edit" accept="image/png, image/jpeg" type="file"/>' +
    '</span>' +
    '<span class="three_delete js_delete"><i class="iconfont icon-shanchu"></i></span></div>'
    if (imgType == 1) {
      $(".three_standard_img .three_img_list").html(html)
    } else if (imgType == 2) {
      imgNum = imgNum + 1;
      $(".three_photo_img .three_img_add").before(html)
      console.log(imgNum)
      if (imgNum == 6) {
        $(".three_photo_img .three_img_add").css('display', "none")
      }
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
$(".three_standard_img .three_img_list").on("change", ".js_z_photo", function () {
  imgType = 1;
  update(this)
})
$(".js_img_photo").change(function () {
  if (imgNum < 6) {
    imgType = 2;
    update(this)
  }
})
$(".three_standard_img").on("change", ".js_edit", function () {
  imgType = 1;
  update(this, 1)
})
$(".three_photo_img").on("change", ".js_edit", function () {
  imgType = 2;
  update(this, 1)
})
$(".three_standard_img").on("click", ".js_delete", function () {
  $(this).parent().remove();
  var html = '<div class="three_img_add"><div class="three_img_cont"><img src="img/add_img.png" alt=""/>' +
    '<input class="btn_file js_z_photo" accept="image/png, image/jpeg" type="file"/></div></div>'
  $(".three_standard_img .three_img_list").html(html)
})
$(".three_photo_img").on("click", ".js_delete", function () {
  imgNum = imgNum - 1;
  if (imgNum < 6) {
    $(".three_photo_img .three_img_add").css('display', "block")
  }
  $(this).parent().remove();
})
$(".js_three").click(function () {
  var imgUrl = $(".three_standard_img .three_img_cont img").attr("data-key")
  var imgArr = [];
  var imgNum = $(".three_photo_img .three_img_cont img");
  for (var i = 0; i < imgNum.length; i++) {
    imgArr.push($(imgNum[i]).attr("data-key"))
  }
  if (!imgUrl && search.type != 2) {
    return;
  } else if (znConfig.images && imgArr.length < 1 && search.type != 1) {
    return;
  }
  if (search.type != 1) {
    postCallBack({images: imgArr.join(",")}, "/dabai-chaorenjob/resume/updateImagesResume", imgInit)
  }
  if (search.type != 2) {
    postCallBack({header: imgUrl}, "/dabai-chaorenjob/resume/updateHeaderResume", headerInit)
  }
})
function headerInit(res) {
  if (res.code == 1) {
    if (search.type == 1) {
      window.location.href = "modifyResume.html"
    } else {
      updateSuc();
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function imgInit(res) {
  if (res.code == 1) {
    if (search.type == 2) {
      window.location.href = "modifyResume.html"
    } else {
      updateSuc();
    }
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}
function updateSuc() {
  threeStep = threeStep + 1
  if (threeStep == 2) {
    postCallBack({steps: 400}, "/dabai-chaorenjob/resume/updateResumeSteps", updateSteps)
  }
}
function updateSteps(res) {
  if (res.code == 1) {
    window.location.href = "stepFour.html"
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
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
  window.location.href = "stepTwo.html"
})
$(".popup_err").click(function(){
  hidePopup()
})