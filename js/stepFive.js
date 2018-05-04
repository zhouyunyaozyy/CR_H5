var search = url_analysis(window.location.search)
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var popupType;
var education_num = 1;
var exp_num = 1;
var stepName = 0;
function initResume(res){
  console.log(res)
  if(res.code == 1){
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
          showPopup("请先填写第死步")
          return;
        case 700:
          popupType = 8;
          showPopup("请修改原简历，不能新增简历")
          return;
      }
    }else{
      $(".back").attr("href","modifyResume.html")
      $(".title").text("基本信息")
      $(".js_two").text("确认")
    }
    if(search.type != 2){
      var education_item = JSON.parse(res.data.education_item) || [];
      if(education_item.length > 0){
        education_num = education_item.length;
        var eduHtml = "";
        for(var i = 0;i<education_item.length;i++){
          if(i == education_num -1){
            $(".five_education_list .step_cont .js_sname").val(education_item[i].sname);
            $(".five_education_list .step_cont .js_majors").val(education_item[i].majors);
            var date1 = new Date(education_item[i].admission_time)
            var year1 = date1.getFullYear();
            var month1 = date1.getMonth() + 1;
            $(".five_education_list .step_cont .js_admission")
              .val(year1 + "-" + month1)
              .attr("data-val",year1-1970 + "-" + month1);
            var date2 = new Date(education_item[i].graduation_time)
            var year2 = date2.getFullYear();
            var month2 = date2.getMonth() + 1;
            $(".five_education_list .step_cont .js_graduation")
              .val(year1 + "-" + month1)
              .attr("data-val",year1-1970 + "-" + month1);
            $(".five_education_list .step_cont .js_education")
              .val(formatData(education_item[i].education,"education"))
              .attr("data-val",education_item[i].education);
          }else{
            eduHtml += htmlTxt(education_item[i])
          }
        }
        $(".five_education_list .step_cont").before(eduHtml)
      }
    }else{
      $(".edu_title").remove();
      $(".five_education_list").remove();
      $(".back").attr("href","modifyResume.html")
      $(".title").text("工作经历")
      $(".js_five").text("确认")
    }
    if(search.type != 1){
      var experience_item = JSON.parse(res.data.experience_item) || [];
      if(experience_item.length > 0){
        exp_num = experience_item.length;
        var expText = "";
        for(var i = 0;i<experience_item.length;i++){
          if(i == exp_num -1){
            $(".five_exp_list .step_cont .js_cname").val(experience_item[i].cname);
            $(".five_exp_list .step_cont .js_job").val(experience_item[i].job);
            var date1 = new Date(experience_item[i].starttime)
            var year1 = date1.getFullYear();
            var month1 = date1.getMonth() + 1;
            $(".five_exp_list .step_cont .js_starttime")
              .val(year1 + "-" + month1)
              .attr("data-val",year1-1970 + "-" + month1);
            var date2 = new Date(experience_item[i].endtime)
            var year2 = date2.getFullYear();
            var month2 = date2.getMonth() + 1;
            $(".five_exp_list .step_cont .js_endtime")
              .val(year2 + "-" + month2)
              .attr("data-val",year2-1970 + "-" + month2);
            $(".five_exp_list .step_cont .js_profile")
              .val(experience_item[i].profile);
            if(experience_item[i].profile){
              $(".text_size").text(experience_item[i].profile.length + "/500")
            }
          }else{
            expText += expHtml(experience_item[i])
          }
        }
        $(".five_exp_list .step_cont").before(expText)
      }
    }else{
      $(".exp_title").remove();
      $(".five_exp_list").remove();
      $(".back").attr("href","modifyResume.html")
      $(".title").text("教育经历")
      $(".js_five").text("确认")
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
var pickerNum;
//学历
var picker1;
$(".five_education_list").on("click",".picker_education",function(){
  var picker_education = this;
  var val = $(this).find("input").attr("data-val");
  if(val){
    var selectedIndex = parseInt(val) - 1
  }else{
    var selectedIndex = 0
  }
  var data1 = formData.education;
  picker1 = new Picker({
    data: [data1],
    selectedIndex:[selectedIndex]
  });
  picker1.on('picker.select', function (selectedVal, selectedIndex) {
    console.log(data1,selectedVal,selectedIndex)
    $(picker_education).find("input").val(data1[selectedIndex[0]].name).attr("data-val",selectedVal);
  });
  picker1.show();
  pickerNum = 1;
})
//时间
var picker2;
$(".g_container").on("click",".picker_date",function(){
  var picker_date = this;
  var date = $(this).find("input").attr("data-val");
  if(date){
    var selectedIndex = date.split("-")
  }else{
    var selectedIndex = [0,0]
  }
  var year = formData.year;
  var month = formData.month;
  picker2 = new Picker({
    data: [year, month],
    selectedIndex:selectedIndex
  });
  picker2.on('picker.select', function (selectedVal, selectedIndex) {
    console.log(selectedIndex,selectedVal)
    var date = new Date();
    var dateName = year[selectedIndex[0]].name+ "-";
    if(year[selectedIndex[0]].name == date.getFullYear()){
      if(month[selectedIndex[1]].name >= parseInt(date.getMonth()) + 1){
        dateName += "至今";
      }else{
        dateName += month[selectedIndex[1]].name;
      }
    }else{
      dateName += month[selectedIndex[1]].name;
    }
    $(picker_date).find("input")
      .val(dateName)
      .attr("data-val",selectedIndex[0] + "-" + selectedIndex[1]);
  });
  picker2.show();
  pickerNum = 2;
})
$(".gray").on("click",".picker-mask",function(){
  switch (pickerNum){
    case 1:
      picker1.hide();
      break;
    case 2:
      picker2.hide();
      break;
  }
})
function htmlTxt (item){
  if(item){
    var date1 = new Date(item.admission_time)
    var year1 = date1.getFullYear();
    var month1 = date1.getMonth() + 1;
    var date2 = new Date(item.admission_time)
    var year2 = date2.getFullYear();
    var month2 = date2.getMonth() + 1;
    item.time_val1 = year1 + "-" + month1;
    item.time_data1 = year1 - 1970 + "-" + month1;
    item.time_val2 = year2 + "-" + month2;
    item.time_data2 = year2 - 1970 + "-" + month2;
  }else{
    var item = {
      time_data1:"",
      time_val1:"",
      time_data2:"",
      time_val2:"",
      sname:"",
      majors:"",
      education:""
    }
  }
  var html = '';
  html += '<div class="step_cont"><div class="delete_btn">删除此条</div>' +
  '<div class="step_item"><span class="step_item_name">学校名称</span>' +
  '<span class="step_item_txt"><input type="text" class="js_sname" value="' +
  item.sname +
  '" placeholder="请填写"/><i></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">所学专业</span>' +
  '<span class="step_item_txt"><input type="text" class="js_majors" value="' +
  item.majors +
  '" placeholder="请填写"/><i></i> </span></div>' +
  '<div class="step_item"><span class="step_item_name">入学年份</span>' +
  '<span class="step_item_txt picker_date"><input type="text" class="js_admission" data-val="' +
  item.time_data1 +
  '" value="' +
  item.time_val1 +
  '" readonly placeholder="请选择"/><i class="iconfont icon-tiaozhuan"></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">毕业年份</span>' +
  '<span class="step_item_txt picker_date"><input type="text" class="js_graduation" data-val="' +
  item.time_data2 +
  '" value="' +
  item.time_val2 +
  '" readonly placeholder="请选择"/><i class="iconfont icon-tiaozhuan"></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">学历</span>' +
  '<span class="step_item_txt picker_education"><input type="text" class="js_education" data-val="' +
  item.education +
  '" value="' +
  formatData(item.education,"education") +
  '" readonly placeholder="请选择"/><i class="iconfont icon-tiaozhuan"></i></span></div></div>'
  return html;
}
$(".five_education_list .education_add").click(function(){
  if(education_num < 5){
    education_num = education_num +1
    var html = htmlTxt()
    $(this).before(html)
  }
})
function expHtml (item){
  if(item){
    var date1 = new Date(item.starttime)
    var year1 = date1.getFullYear();
    var month1 = date1.getMonth() + 1;
    var date2 = new Date(item.endtime)
    var year2 = date2.getFullYear();
    var month2 = date2.getMonth() + 1;
    item.time_val1 = year1 + "-" + month1;
    item.time_data1 = year1 - 1970 + "-" + month1;
    item.time_val2 = year2 + "-" + month2;
    item.time_data2 = year2 - 1970 + "-" + month2;
  }else{
    var item = {
      time_data1:'',
      time_val1:'',
      time_data2:"",
      time_val2:"",
      cname:"",
      job:"",
      profile:""
    }
  }
  var html = '';
  html += '<div class="step_cont"><div class="step_item"><span class="step_item_name">入职时间</span>' +
  '<span class="step_item_txt picker_date"><input type="text" class="js_starttime" data-val="' +
  item.time_data1 +
  '" value="' +
  item.time_val1 +
  '" readonly placeholder="请选择"/><i class="iconfont icon-tiaozhuan"></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">离职时间</span>' +
  '<span class="step_item_txt picker_date"><input type="text" class="js_endtime" data-val="' +
  item.time_data2 +
  '" value="' +
  item.time_val2 +
  '" readonly placeholder="请选择"/><i class="iconfont icon-tiaozhuan"></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">公司</span>' +
  '<span class="step_item_txt"><input type="text" class="js_cname" value="' +
  item.cname +
  '" placeholder="请填写"/><i></i></span></div>' +
  '<div class="step_item"><span class="step_item_name">职位</span>' +
  '<span class="step_item_txt"><input type="text" class="js_job" value="' +
  item.job +
  '" placeholder="请填写"/><i></i></span></div>' +
  '<div class="step_area"><div class="area_title">工作内容</div>' +
  '<div class="textarea_cont"><textarea class="js_profile" value="' +
  item.profile +
  '" placeholder="请描述工作内容" rows="5" maxlength="500"></textarea><span class="text_size">' +
  item.profile.length +
  '/500</span></div></div>' +
  '<div class="delete_btn">删除此条</div></div>'
  return html;
}
$(".five_exp_list .five_add_btn").click(function(){
  if(exp_num < 10){
    exp_num = exp_num +1
    var html = expHtml()
    $(this).before(html)
  }
})
$(".step_cont").on("keyup","textarea",function(){
  $(this).next(".text_size").text(this.value.length + "/500")
})
$(".five_exp_list").on("click",".delete_btn",function(){
  exp_num = exp_num - 1
  $(this).parent(".step_cont").remove();
})
$(".five_education_list").on("click",".delete_btn",function(){
  education_num = education_num - 1
  $(this).parent(".step_cont").prev(".step_cont").remove();
})
var updateState = 0;
$(".js_five").click(function(){
  if(updateState === 0){
    updateState = 1;
  }else{
    popupType = 1;
    showPopup("信息验证中请耐心等待。。。")
    return;
  }
  var experience_item = [];
  var education_item = [];
  if(search.type != 2){
    for(var i = 0;i< education_num;i++){
      var sname = $(".five_education_list .step_cont").eq(i).find(".js_sname").val();
      var majors = $(".five_education_list .step_cont").eq(i).find(".js_majors").val();
      var admission_time = $(".five_education_list .step_cont").eq(i).find(".js_admission").val();
      admission_time = new Date(admission_time).getTime();
      var graduation_time = $(".five_education_list .step_cont").eq(i).find(".js_graduation").val();
      graduation_time = new Date(graduation_time).getTime();
      var education = $(".five_education_list .step_cont").eq(i).find(".js_education").attr("data-val");
      if(!sname){
        popupType = 1;
        showPopup("请填写学校名称")
        return;
      }else if(!majors){
        popupType = 1;
        showPopup("请填写所学专业")
        return;
      }else if(!admission_time){
        popupType = 1;
        showPopup("请选择入学年份")
        return;
      }else if(!graduation_time){
        popupType = 1;
        showPopup("请选择毕业年份")
        return;
      }else if(admission_time > graduation_time){
        popupType = 1;
        showPopup("毕业年份不能小于入学年份")
        return;
      }else if(!education){
        popupType = 1;
        showPopup("请选择学历")
        return;
      }
      education_item.push({
        sname:sname,
        majors:majors,
        admission_time:admission_time,
        graduation_time:graduation_time,
        education:education
      })
    }
  }
  if(search.type != 1){
    var cname1 = $(".five_exp_list .step_cont").eq(0).find(".js_cname").val();
    var job1 = $(".five_exp_list .step_cont").eq(0).find(".js_job").val();
    var starttime1 = $(".five_exp_list .step_cont").eq(0).find(".js_starttime").val();
    starttime1 = new Date(starttime1).getTime();
    var endtime1 = $(".five_exp_list .step_cont").eq(0).find(".js_endtime").val();
    endtime1 = new Date(endtime1).getTime();
    var profile1 = $(".five_exp_list .step_cont").eq(0).find(".js_profile").val();
    if(exp_num > 1 || cname1 || job1 || starttime1 || endtime1 || profile1){
      for(var i = 0;i< exp_num;i++){
        var cname = $(".five_exp_list .step_cont").eq(i).find(".js_cname").val();
        var job = $(".five_exp_list .step_cont").eq(i).find(".js_job").val();
        var starttime = $(".five_exp_list .step_cont").eq(i).find(".js_starttime").val();
        starttime = new Date(starttime).getTime();
        var endtime = $(".five_exp_list .step_cont").eq(i).find(".js_endtime").val();
        endtime = new Date(endtime).getTime();
        var profile = $(".five_exp_list .step_cont").eq(i).find(".js_profile").val();
        if(!starttime){
          popupType = 1;
          showPopup("请选择入职时间")
          return;
        }else if(!endtime){
          popupType = 1;
          showPopup("请选择离职时间")
          return;
        }else if(starttime > endtime){
          popupType = 1;
          showPopup("离职时间不能小于入职时间")
          return;
        }else if(!cname){
          popupType = 1;
          showPopup("请填写公司名称")
          return;
        }else if(!job){
          popupType = 1;
          showPopup("请填写职位")
          return;
        }else if(!profile){
          popupType = 1;
          showPopup("请填写工作内容")
          return;
        }
        experience_item.push({
          starttime:starttime,
          endtime:endtime,
          cname:cname,
          job:job,
          profile:profile
        })
      }
    }
  }
  if(search.type != 2){
    postCallBack({education_item:JSON.stringify(education_item)},"/dabai-chaorenjob/resume/updateEducationItemResume",eduInit)
  }
  if(search.type != 1){
    postCallBack({experience_item:JSON.stringify(experience_item)},"/dabai-chaorenjob/resume/updateExperienceItemResume",expInit)
  }
})
function eduInit(res){
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
  console.log(res)
}
function expInit(res){
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
  console.log(res)
}
function updateSuc(){
  stepName = stepName + 1
  if(stepName == 2){
    postCallBack({steps:600},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
  }
}
function updateSteps(res){
  if(res.code == 1){
    window.location.href = "stepSix.html"
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
    case 6:
      window.location.href = "stepFour.html"
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
  window.location.href = "stepFour.html"
})
$(".popup_err").click(function(){
  hidePopup()
})