getCallBack({},"/dabai-chaorenjob/resumeAuditSnapshot/getMyResumeAudit",resumeState)
getCallBack({},"/dabai-chaorenjob/resumeAuditSnapshot/getMyResumeAuditSnapshot",resumeInit)
var popupType;
function resumeState(res){
  if(res.code == 1){
    switch (res.data.status){
      case 1:
        var html = '<div class="resume_state_box blue">' +
          '<div class="state_img"><img src="img/audit.png" alt=""/></div><div class="state_name">审核中</div></div>' +
          '<div class="audit_alert">简历审核中，工作人员将在24小时内审核完毕，请耐心等待。</div>'
        $(".resume_top_box").html(html)
        break;
      case 4:
        var html ='<div class="resume_state_box red">' +
          '<div class="state_img"><img src="img/pass.png" alt=""/></div><div class="state_name">审核通过</div></div>'
          '</div></div>'
        $(".resume_top_box").html(html)
        $(".header .title").after('<a href="modifyResume.html" class="edit"><i class="iconfont icon-xiugaiziliao"></i></a>')
        break;
      case 8:
        var html ='<div class="resume_state_box blue">' +
          '<div class="state_img"><img src="img/noPass.png" alt=""/></div><div class="state_name">审核失败</div></div>' +
          '<div class="audit_err_alert"><div class="audit_err_title">拒绝原因</div><div class="audit_err_txt">' +
          res.data.note +
          '</div></div>'
        $(".resume_top_box").html(html)
        $(".header .title").after('<a href="modifyResume.html" class="edit"><i class="iconfont icon-xiugaiziliao"></i></a>')
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
function resumeInit(res){
  if(res.code == 1){
    $(".js_target").text(res.data.target_name)
    $(".title b").text("("+ res.data.percent +"%)")
    $(".js_ethnicity").text(formatData(res.data.ethnicity,"ethnicity"))
    $(".js_address").text(address(res.data.birthplace,4))
    $(".js_wedding").text(formatData(res.data.wedding,"wedding"))
    $(".js_politics").text(formatData(res.data.politics,"political"))
    $(".js_height").text(res.data.height+"CM")
    $(".js_weight").text(res.data.weight+"KG")
    $(".js_vision_left").text(formatData(res.data.vision_left,"vision"))
    $(".js_vision_right").text(formatData(res.data.vision_right,"vision"))
    $(".js_mandarin").text(formatData(res.data.mandarin,"mandarin"))
    $(".js_english").text(formatData(res.data.english,"english"))
    $(".js_lang").text(res.data.language)
    $(".js_education").text(formatData(res.data.education,"education"))
    $(".js_exp").text(formatData(res.data.experience,"offerExperience"))
    $(".js_offer_state").text(formatData(res.data.employ,"offerState"))
    $(".js_tel").text(res.data.tel)
    $(".js_header").attr("src",res.data.headerUrl);
    if(res.data.videoUrl){
      $(".js_video").attr("src",res.data.videoUrl);
    }else{
      $(".video_cont").remove();
      $(".video_box .resume_title").after("<span class='no_data_txt'>暂无内容</span>")
    }
    $(".js_profile").text(res.data.profile)
    if(res.data.imagesUrl.length > 0){
      var imgHtml = ""
      for(var i = 0;i< res.data.imagesUrl.length;i++){
        imgHtml += '<img src="' +
        res.data.imagesUrl[i] +
        '" alt=""/>'
      }
      $(".img_box .id_photo_cont").html(imgHtml)
    }else{
      $(".img_box .id_photo_cont").html("<span class='no_data_txt'>暂无内容</span>")
    }
    var education_item = JSON.parse(res.data.education_item);
    if(education_item.length > 0){
      var educationHtml = "";
      for(var a = 0;a <education_item.length; a++){
        var startTime = new Date(parseInt(education_item[a].admission_time))
        var endTime = new Date(parseInt(education_item[a].graduation_time))
        educationHtml += '<div class="education_item"><div class="resume_item"><span class="resume_label">学校名称</span><span class="resume_text wrap">' +
        education_item[a].sname +
        '</span></div><div class="resume_item"><span class="resume_label">所学专业</span><span class="resume_text wrap">' +
        education_item[a].majors  +
        '</span></div><div class="resume_item"><span class="resume_label">在校时间</span><span class="resume_text">' +
        startTime.getFullYear() + "." + (startTime.getMonth()+1) + "-" + endTime.getFullYear() + "." + (endTime.getMonth()+1) +
        '</span></div><div class="resume_item"><span class="resume_label">学历</span><span class="resume_text">' +
        formatData(education_item[a].education,"education") +
        '</span></div></div>'
      }
      $(".education_box .resume_title").after(educationHtml)
    }else{
      $(".education_box .resume_title").after("<span class='no_data_txt'>暂无内容</span>")
    }
    var experience_item = JSON.parse(res.data.experience_item) || [];
    if(experience_item.length > 0){
      var expHtml = "";
      for(var b = 0;b <experience_item.length; b++){
        var startTime = new Date(parseInt(experience_item[b].starttime))
        var endTime = new Date(parseInt(experience_item[b].endtime))
        expHtml += '<div class="exp_item"><div class="resume_item"><span class="resume_label">工作时间</span>' +
        '<span class="resume_text">' +
        startTime.getFullYear() + "." + (startTime.getMonth()+1) + "-" + endTime.getFullYear() + "." + (endTime.getMonth()+1) +
        '</span></div><div class="resume_item"><span class="resume_label">公司</span><span class="resume_text wrap">' +
        experience_item[b].cname +
        '</span></div><div class="resume_item"><span class="resume_label">职位</span><span class="resume_text wrap">' +
        experience_item[b].job +
        '</span></div><div class="resume_exp"><div class="resume_exp_label">工作内容</div><div class="resume_exp_text ">' +
        experience_item[b].profile +
        '</div></div></div>'
      }
      $(".exp_box .resume_title").after(expHtml)
    }else{
      $(".exp_box .resume_title").after("<span class='no_data_txt'>暂无内容</span>")
    }
    if(res.data.skillUrl.length > 0){
      var certHtml = ""
      for(var c = 0;c < res.data.skillUrl.length; c++){
        certHtml += '<div class="cert_item"><div class="cert_img"><img src="' +
        res.data.skillUrl[c].skillUrl +
        '" alt=""/></div><div class="cert_name">' +
        res.data.skillUrl[c].name +
        '</div></div>'
      }
      $(".cert_list").html(certHtml)
    }else{
      $(".cert_list").html("<span class='no_data_txt'>暂无内容</span>")
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