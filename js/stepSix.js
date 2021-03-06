var search = url_analysis(window.location.search)
getCallBack({},"/dabai-chaorenjob/common/qiniu/token",initToken)
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var imgToken,popupType;
var sucNum = 0;
var imgNum = 1;
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
function initResume(res){
  if(res.code == 1) {
    if(search.type != 1 && search.type != 2){
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
        case 400:
          popupType = 6;
          showPopup("请先填写第四步")
          return;
        case 500:
          popupType = 7;
          showPopup("请先填写第五步")
          return;
      }
    }else{
      $(".title").text("基本信息")
      $(".js_two").text("确认")
    }
    if(search.type != 2){
      $(".profile_cont textarea").val(res.data.profile);
      if(res.data.profile){
        $(".profile_cont .text_size").text(res.data.profile.length + "/200");
      }
    }else{
      $(".disc_title").remove();
      $(".profile_cont").remove();
      $(".title").text("证书")
      $(".js_six").text("确认")
    }
    if(search.type != 1){
      if(res.data.skillUrl.length > 0){
        var html = '';
        for(var i = 0;i< res.data.skillUrl.length; i++){
          html += certText(res.data.skillUrl[i])
        }
        $(".six_cert_item").remove();
        $(".five_add_btn").before(html)
      }
    }else{
      $(".card_title").remove();
      $(".six_certificate").remove();
      $(".title").text("自我描述")
      $(".js_six").text("确认")
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
$(".profile_cont textarea").keyup(function(){
  $(this).next(".text_size").text(this.value.length + "/200")
})
function certText(item){
  var html = '';
  if(!item){
    var item = {
      name:"",
      skillUrl:"img/add_img.png",
      url:""
    }
    html += '<div class="six_cert_item is_hide"><div class="three_img_item"><div class="three_img_cont"><img data-key="' +
    item.url +
    '" src="' +
    item.skillUrl +
    '" alt=""/><input class="btn_file add_img_btn" accept="image/png, image/jpeg" type="file"/></div>'
  }else{
    html += '<div class="six_cert_item"><div class="delete_btn">删除此条</div>'+
    '<div class="three_img_item"><div class="three_img_cont"><img data-key="' +
    item.url +
    '" src="' +
    item.skillUrl +
    '" alt=""/></div>'
  }
  html += '<span class="three_edit"><i class="iconfont icon-bianji"></i><input class="btn_file change_img_btn" accept="image/png, image/jpeg" type="file"/></span>' +
  '<span class="three_delete"><i class="iconfont icon-shanchu"></i></span></div>' +
  '<div class="cert_item_name"><span>证书名称</span><input type="text" maxlength="20" value="' +
  item.name +
  '" placeholder="请输入20字以内证书名字"/></div>' +
  '<div class="delete_btn">删除此条</div></div>'
  return html;
}
function update (ipt,cType){
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
    url:"http://upload-z2.qiniu.com",
    data: formData,
    contentType : false,
    processData : false,
    success:function(res){
      getCallBack({},"/dabai-chaorenjob/common/qiniu/url/"+res.key,showImg,{key:res.key,ipt:ipt,cType:cType})
      console.log(res)
    }
  })
}
function showImg(res,obj){
  if(res.code == 1){
    if(obj.cType == 1){
      $(obj.ipt).prev("img").attr({
        "src":res.data,
        "data-key":obj.key
      }).parents(".six_cert_item").removeClass("is_hide");
      $(obj.ipt).remove()
    }else if(obj.cType == 2){
      $(obj.ipt).parent().prev(".three_img_cont").find("img").attr({
        "src":res.data,
        "data-key":obj.key
      })
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
$(".five_add_btn").click(function(){
  if(imgNum < 6){
    var html = certText();
    imgNum = imgNum + 1;
    $(this).before(html)
  }else{
    popupType = 1;
    showPopup("最多添加6张证书")
  }
})
$(".six_certificate").on("change",".add_img_btn",function(){
  update(this,1)
})
$(".six_certificate").on("change",".change_img_btn",function(){
  update(this,2)
})
$(".six_certificate").on("click",".delete_btn",function(){
  imgNum = imgNum -1;
  $(this).parent(".six_cert_item").remove();
})
$(".six_certificate").on("click",".three_delete",function(){
  $(this).siblings(".three_img_cont").find("img").attr({
    "src":"img/add_img.png",
    "data-key":""
  }).after('<input class="btn_file add_img_btn" accept="image/png, image/jpeg" type="file"/>')
    .parents(".six_cert_item").addClass("is_hide");
})
var updateState = 0;
$(".js_six").click(function(){
  if(updateState === 0){
    updateState = 1;
  }else{
    popupType = 1;
    showPopup("信息验证中请耐心等待。。。")
    return;
  }
  var skill = [];
  var profile = $(".profile_cont textarea").val();
  if(!profile && search.type != 2){
    popupType = 1;
    showPopup("请填写自我描述")
    return;
  }
  if(search.type != 1){
    var key1 = $(".six_cert_item:eq(0)").find(".three_img_cont img").attr("data-key");
    var zName1 = $(".six_cert_item:eq(0)").find(".cert_item_name input").val();
    if(imgNum >1 || key1 || zName1){
      for(var i = 0;i<imgNum;i++){
        var key = $(".six_cert_item").eq(i).find(".three_img_cont img").attr("data-key");
        var zName = $(".six_cert_item").eq(i).find(".cert_item_name input").val();
        if(!key){
          popupType = 1;
          showPopup("请上传证书照")
          return;
        }else if(!zName){
          popupType = 1;
          showPopup("请填写证书名称")
          return;
        }
        skill.push({
          name:zName,
          url:key
        })
      }
    }
  }
  if(search.type != 2){
    postCallBack({profile:profile},"/dabai-chaorenjob/resume/updateProfileResume",updateInfo)
  }
  if(search.type != 1){
    postCallBack({skill:JSON.stringify(skill)},"/dabai-chaorenjob/resume/updateSkillResume",updateZs)
  }
})
function updateInfo (res){
  if(res.code == 1){
    if(search.type == 1){
      window.location.href = "modifyResume.html"
    }else{
      updateSuc();
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
  console.log(res.code)
}
function updateZs (res){
  if(res.code == 1){
    if(search.type == 2){
      window.location.href = "modifyResume.html"
    }else{
      updateSuc();
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
  console.log(res.code)
}
function updateSuc(){
  sucNum = sucNum + 1;
  if(sucNum == 2){
    postCallBack({steps:700},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
  }
}
function updateSteps(res){
  if(res.code == 1){
    postCallBack({},"/dabai-chaorenjob/resumeAuditSnapshot/submitAudit",submitAudit)
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
function submitAudit(res){
  if(res.code == 1){
    popupType = 9;
    showPopup("前往实名认证",1)
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
    case 6:
      window.location.href = "stepFour.html"
      break;
    case 7:
      window.location.href = "stepFive.html"
      break;
    default :
      hidePopup()
      return;
  }
})
$(".js_back").click(function(){
  popupType = 8;
  showPopup("内容未保存,返回将导致内容丢失，是否确认返回？",1)
})
$(".popup_suc").click(function(){
  switch (popupType){
    case 8:
      if(!search.type){
        window.location.href = "stepFive.html"
      }else{
        window.location.href = "modifyResume.html"
      }
      break;
    case 9:
      window.location.href = "realName.html"
      break;
  }
})
$(".popup_err").click(function(){
  switch (popupType){
    case 8:
      hidePopup()
      break;
    case 9:
      window.location.href = "resumeDetail.html"
      break;
  }
})