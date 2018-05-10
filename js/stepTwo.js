var search = url_analysis(window.location.search);
var popupType;
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
//var selectedIndex1,selectedIndex2,selectedIndex3,selectedIndex4,selectedIndex5,selectedIndex6,selectedIndex7,selectedIndex8,selectedIndex9,selectedIndex10,selectedIndex11;
function initResume(res){
  if(res.code == 1){
    if(search.type != 1){
      switch (res.data.steps){
        case 100:
          popupType = 3;
          showPopup("请先填写第一步")
          return;
        //case 700:
        //  popupType = 8;
        //  showPopup("请修改原简历，不能新增简历")
        //  return;
      }
    }else{
      $(".title").text("基本信息")
      $(".js_two").text("确认")
    }
    //民族
    if(res.data.ethnicity){
      $(".js_nation").val(formatData(res.data.ethnicity,"ethnicity")).attr("data-val",res.data.ethnicity)
    }
    //selectedIndex1 = [res.data.ethnicity-1]
    //籍贯
    if(res.data.birthplace){
      $(".js_native_place").val(address(res.data.birthplace,4)).attr("data-val",res.data.birthplace);
    }
    //var code = res.data.birthplace.toString();
    //selectedIndex2 = []
    //for(var a = 0; a<areaList.length;a++){
    //  if(areaList[a].code.slice(0,2) == code.slice(0,2)){
    //    selectedIndex2[0] = a;
    //    second = areaList[a].children;
    //    for(var b = 0; b<areaList[a].children.length; b++){
    //      if(areaList[a].children[b].code.slice(2,4) == code.slice(2,4)){
    //        selectedIndex2[1] = b;
    //        third = areaList[a].children[b].children;
    //        for(var c = 0; c<areaList[a].children[b].children.length; c++){
    //          if(areaList[a].children[b].children[c].code == code){
    //            selectedIndex2[2] = c;
    //          }
    //        }
    //      }
    //    }
    //  }
    //}
    //婚姻状况
    if(res.data.wedding) {
      $(".jc_marriage").val(formatData(res.data.wedding, "wedding")).attr("data-val", res.data.wedding);
    }
    //selectedIndex3 = [res.data.wedding-1]
    //政治面貌
    if(res.data.politics) {
      $(".js_politics").val(formatData(res.data.politics,"political")).attr("data-val",res.data.politics);
    }
    //selectedIndex4 = [res.data.politics-1]
    //身高
    if(res.data.height){
      $(".js_height").val(res.data.height);
    }
    //体重
    if(res.data.weight){
      $(".js_weight").val(res.data.weight);
    }
    //左眼视力
    if(res.data.vision_left) {
      $(".js_left").val(formatData(res.data.vision_left,"vision")).attr("data-val",res.data.vision_left);
    }
    //selectedIndex5 = [res.data.vision_left-1]
    //右眼视力
    if(res.data.vision_right) {
      $(".js_right").val(formatData(res.data.vision_right,"vision")).attr("data-val",res.data.vision_right);
    }
    //selectedIndex6 = [res.data.vision_right-1]
    //普通话
    if(res.data.mandarin) {
      $(".js_ch").val(formatData(res.data.mandarin,"mandarin")).attr("data-val",res.data.mandarin);
    }
    //selectedIndex7 = [(res.data.mandarin - 1 + "").slice(-1)]
    //英语
    if(res.data.english) {
      $(".js_en").val(formatData(res.data.english,"english")).attr("data-val",res.data.english);
    }
    //selectedIndex11 = [(res.data.english - 1 + "").slice(-1)]
    //小语种
    if(res.data.language) {
      $(".js_lang").val(res.data.language);
    }
    //最高学历
    if(res.data.education) {
      $(".js_education").val(formatData(res.data.education,"education")).attr("data-val",res.data.education);
    }
    //selectedIndex8 = [res.data.education-1]
    //工作经验
    if(res.data.experience) {
      $(".js_exp").val(formatData(res.data.experience,"offerExperience")).attr("data-val",res.data.experience);
    }
    //selectedIndex9 = [res.data.experience-1]
    //任职状态
    if(res.data.employ) {
      $(".js_offer_state").val(formatData(res.data.employ,"offerState")).attr("data-val",res.data.employ);
    }
    //selectedIndex10 = [res.data.employ-1]
    //电话
    if(res.data.tel) {
      $(".js_tel").val(res.data.tel);
    }
    initPicker();
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
var updateNum = 0;
var pickerNum = 0;
function initPicker(){
  //民族
  var data1 = formData.ethnicity;
  var picker1 = new Picker({
    data: [data1],
    //selectedIndex:selectedIndex1
  });
  picker1.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_nation input").val(data1[selectedIndex[0]].name).attr("data-val",selectedVal);
  });
  $(".picker_nation").click(function(){
    picker1.show();
    pickerNum = 1;
  })

//籍贯
  var first = areaList; /* 省，直辖市 */
  var second = areaList[0].children; /* 市 */
  var third = areaList[0].children[0].children; /* 镇 */

  var checked = [0, 0, 0]; /* 已选选项 */
  var picker2 = new Picker({
    data: [first, second, third],
    //selectedIndex: selectedIndex2,
    title: '地址选择'
  });

  picker2.on('picker.select', function (selectedVal, selectedIndex) {
    var text1 = first[selectedIndex[0]].name;
    var text2 = second[selectedIndex[1]].name;
    var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].name : '';

    $('.picker_native_place input').val(text1 + ' ' + text2 + ' ' + text3).attr("data-val",selectedVal[2]);
  });

  picker2.on('picker.change', function (index, selectedIndex) {
    console.log(index,selectedIndex)
    if (index === 0){
      firstChange();
    } else if (index === 1) {
      secondChange();
    }
    function firstChange() {
      second = areaList[selectedIndex].children;
      third = areaList[selectedIndex].children[0].children;
      checked[0] = selectedIndex;
      picker2.refillColumn(1, second);
      picker2.refillColumn(2, third);
      picker2.scrollColumn(1, 0)
      picker2.scrollColumn(2, 0)
    }
    function secondChange() {
      third = areaList[checked[0]].children[selectedIndex].children;
      checked[1] = selectedIndex;
      picker2.refillColumn(2, third);
      picker2.scrollColumn(2, 0)
    }

  });
  $(".picker_native_place").click( function () {
    picker2.show();
    pickerNum = 2;
  });

//婚姻状况
  var data3 = this.formData.wedding;
  var picker3 = new Picker({
    data: [data3],
    //selectedIndex: selectedIndex3
  });
  picker3.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_marriage input").val(data3[selectedIndex[0]].name).attr("data-val",selectedVal);
  });
  $(".picker_marriage").click(function(){
    picker3.show();
    pickerNum = 3;
  })
//政治面貌
  var data4 = this.formData.political;
  var picker4 = new Picker({
    data: [data4],
    //selectedIndex:selectedIndex4
  });
  picker4.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_politics input").val(data4[selectedIndex[0]].name).attr("data-val",selectedVal);
  });
  $(".picker_politics").click(function(){
    picker4.show();
    pickerNum = 4;
  })
//裸眼视力左眼
  var data5 = this.formData.vision;
  var picker5 = new Picker({
    data: [data5],
    //selectedIndex:selectedIndex5
  });
  picker5.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_left input").val(data5[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_left").click(function(){
    picker5.show();
    pickerNum = 5;
  })
//裸眼视力右眼
  var data6 = this.formData.vision;
  var picker6 = new Picker({
    data: [data6],
    //selectedIndex:selectedIndex6
  });
  picker6.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_right input").val(data6[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_right").click(function(){
    picker6.show();
    pickerNum = 6;
  })
//普通话水平
  var data7 = this.formData.mandarin;
  var picker7 = new Picker({
    data: [data7],
    //selectedIndex:selectedIndex7
  });
  picker7.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_chinese input").val(data7[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_chinese").click(function(){
    picker7.show();
    pickerNum = 7;
  })
//最高学历
  var data8 = this.formData.education;
  var picker8 = new Picker({
    data: [data8],
    //selectedIndex:selectedIndex8
  });
  picker8.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_education input").val(data8[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_education").click(function(){
    picker8.show();
    pickerNum = 8;
  })
//工作经验
  var data9 = this.formData.offerExperience;
  var picker9 = new Picker({
    data: [data9],
    //selectedIndex:selectedIndex9
  });
  picker9.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_exp input").val(data9[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_exp").click(function(){
    picker9.show();
    pickerNum = 9;
  })
//任职状态
  var data10 = this.formData.offerState;
  var picker10 = new Picker({
    data: [data10],
    //selectedIndex:selectedIndex10
  });
  picker10.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_offer_state input").val(data10[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_offer_state").click(function(){
    picker10.show();
    pickerNum = 10;
  })
//英语
  var data11 = this.formData.english;
  var picker11 = new Picker({
    data: [data11],
    //selectedIndex:selectedIndex11
  });
  picker11.on('picker.select', function (selectedVal, selectedIndex) {
    $(".picker_english input").val(data11[selectedIndex[0]].name).attr("data-val",selectedVal);;
  });
  $(".picker_english").click(function(){
    picker11.show();
    pickerNum = 11;
  })
}
$(".gray").on("click",".picker-mask",function(){
  switch (pickerNum){
    case 1:
      picker1.hide();
      break;
    case 2:
      picker2.hide();
      break;
    case 3:
      picker3.hide();
      break;
    case 4:
      picker4.hide();
      break;
    case 5:
      picker5.hide();
      break;
    case 6:
      picker6.hide();
      break;
    case 7:
      picker7.hide();
      break;
    case 8:
      picker8.hide();
      break;
    case 9:
      picker9.hide();
      break;
    case 10:
      picker10.hide();
      break;
  }
})
var updateState = 0;
$(".js_two").click(function(){
  if(updateState === 0){
    updateState = 1;
  }else{
    popupType = 1;
    showPopup("信息验证中请耐心等待。。。")
    return;
  }
  /*籍贯信息 /dabai-chaorenjob/resume/updateNativeResume*/
  //民族
  var ethnicity = $(".js_nation").attr("data-val");
  //籍贯
  var birthplace  = $(".js_native_place").attr("data-val");
  //婚姻状况
  var wedding = $(".jc_marriage").attr("data-val");
  //政治面貌
  var politics = $(".js_politics").attr("data-val");

  /*基础信息 /dabai-chaorenjob/resume/updateBaseResume*/
  //身高
  var height = $(".js_height").val();
  //体重
  var weight = $(".js_weight").val();
  //左眼视力
  var vision_left = $(".js_left").attr("data-val");
  //右眼视力
  var vision_right = $(".js_right").attr("data-val");
  //普通话
  var mandarin = $(".js_ch").attr("data-val");
  //英语
  var english = $(".js_en").attr("data-val");
  //小语种
  var language = $(".js_lang").val();
  //最高学历
  var education = $(".js_education").attr("data-val");

  /*联系方式 /dabai-chaorenjob/resume/updateLinkResume*/
  //工作经验
  var experience = $(".js_exp").attr("data-val");
  //任职状态
  var employ = $(".js_offer_state").attr("data-val");
  //电话
  var tel = $(".js_tel").val();
  if(!ethnicity){
    popupType = 1;
    showPopup("请选择民族")
    return;
  }else if(!birthplace){
    popupType = 1;
    showPopup("请选择籍贯")
    return;
  }else if(!wedding){
    popupType = 1;
    showPopup("请选择婚姻状况")
    return;
  }else if(!politics){
    popupType = 1;
    showPopup("请选择政治面貌")
    return;
  }else if(!/^[12][0-9]{2}$/.test(height)){
    popupType = 1;
    showPopup("请填写身高")
    return;
  }else if(!/^[0-9]{2,3}$/.test(weight)){
    popupType = 1;
    showPopup("请填写体重")
    return;
  }else if(!vision_left){
    popupType = 1;
    showPopup("请选择左眼视力")
    return;
  }else if(!vision_right){
    popupType = 1;
    showPopup("请选择右眼视力")
    return;
  }else if(!mandarin){
    popupType = 1;
    showPopup("请选择普通话等级")
    return;
  }else if(!english){
    popupType = 1;
    showPopup("请选择英语等级")
    return;
  }else if(language.length > 20){
    popupType = 1;
    showPopup("熟悉小语种内容不能超过20字")
    return;
  }else if(!education){
    popupType = 1;
    showPopup("请选择学历")
    return;
  }else if(!experience){
    popupType = 1;
    showPopup("请选择工作经历")
    return;
  }else if(!employ){
    popupType = 1;
    showPopup("请选择任职状态")
    return;
  }else if(!/^1[34578][0-9]{9}$/.test(tel)){
    popupType = 1;
    showPopup("请填写手机号")
    return;
  }
  var nativePost = {
    ethnicity:ethnicity,
    birthplace:birthplace,
    wedding:wedding,
    politics:politics
  }
  var basePost = {
    height:height,
    weight:weight,
    vision_left:vision_left,
    vision_right:vision_right,
    mandarin:mandarin,
    english:english,
    language:language,
    education:education
  }
  var linkPost = {
    tel:tel,
    employ:employ,
    experience:experience
  }
  postCallBack(nativePost,"/dabai-chaorenjob/resume/updateNativeResume",nativeInit)
  postCallBack(basePost,"/dabai-chaorenjob/resume/updateBaseResume",baseInit)
  postCallBack(linkPost,"/dabai-chaorenjob/resume/updateLinkResume",linkInit)
  console.log(linkPost,basePost,nativePost)
})
function nativeInit(res){
  if(res.code == 1){
    updateSuc();
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
function linkInit(res){
  if(res.code == 1){
    updateSuc();
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
function baseInit(res){
  if(res.code == 1){
    updateSuc();
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
  updateNum = updateNum + 1;
  if(updateNum == 3){
    if(search.type == 1){
      window.location.href = "modifyResume.html"
    }else{
      postCallBack({steps:300},"/dabai-chaorenjob/resume/updateResumeSteps",updateSteps)
    }
  }
}
function updateSteps(res){
  if(res.code == 1){
    window.location.href = "stepThree.html"
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
  if(!search.type){
    window.location.href = "stepOne.html"
  }else{
    window.location.href = "modifyResume.html"
  }
})
$(".popup_err").click(function(){
  hidePopup()
})