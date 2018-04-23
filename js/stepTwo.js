getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
function initResume(res){
  if(res.code == 1){
    //民族
    $(".js_nation").val(formatData(res.data.ethnicity,"ethnicity")).attr("data-val",res.data.ethnicity)
    //籍贯
    $(".js_native_place").val(address(res.data.birthplace,4)).attr("data-val",res.data.birthplace);
    //婚姻状况
    $(".jc_marriage").val(formatData(res.data.wedding,"wedding")).attr("data-val",res.data.wedding);
    //政治面貌
    $(".js_politics").val(formatData(res.data.politics,"political")).attr("data-val",res.data.politics);
    //身高
    $(".js_height").val(res.data.height);
    //体重
    $(".js_weight").val(res.data.weight);
    //左眼视力
    $(".js_left").val(formatData(res.data.vision_left,"vision")).attr("data-val",res.data.vision_left);
    //右眼视力
    $(".js_right").val(formatData(res.data.vision_right,"vision")).attr("data-val",res.data.vision_right);
    //普通话
    $(".js_ch").val(formatData(res.data.mandarin,"mandarin")).attr("data-val",res.data.mandarin);
    //英语
    $(".js_en").val(formatData(res.data.english,"english")).attr("data-val",res.data.english);
    //小语种
    $(".js_lang").val(res.data.language);
    //最高学历
    $(".js_education").val(formatData(res.data.education,"education")).attr("data-val",res.data.education);
    //工作经验
    $(".js_exp").val(formatData(res.data.experience,"offerExperience")).attr("data-val",res.data.experience);
    //任职状态
    $(".js_offer_state").val(formatData(res.data.employ,"offerState")).attr("data-val",res.data.employ);
    //电话
    $(".js_tel").val(res.data.tel);
  }
  console.log(res)
}
var updateNum = 0;
var pickerNum = 0;
//民族
var data1 = formData.ethnicity;
var picker1 = new Picker({
  data: [data1]
});
picker1.on('picker.select', function (selectedVal, selectedIndex) {
  $(".picker_nation input").val(data1[selectedIndex[0]].name).attr("data-val",selectedVal);
});
$(".picker_nation").click(function(){
  picker1.show();
  pickerNum = 1;
})
//picker1.on('picker.change', function (index, selectedIndex) {
//  console.log(index);
//});
//picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
//  console.log(selectedVal);
//});

//籍贯
var first = areaList; /* 省，直辖市 */
var second = areaList[0].children; /* 市 */
var third = areaList[0].children[0].children; /* 镇 */
var selectedIndex = [12,1, 3]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */
var picker2 = new Picker({
  data: [first, second, third],
  selectedIndex: selectedIndex,
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
    var first_index = checked[0];
    picker2.refillColumn(2, third);
    picker2.scrollColumn(2, 0)
  }

});

picker2.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(321,selectedVal);
  console.log(selectedIndex);
});

$(".picker_native_place").click( function () {
  picker2.show();
  pickerNum = 2;
});

//婚姻状况
var data3 = this.formData.wedding;
var picker3 = new Picker({
  data: [data3]
});
picker3.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data3,selectedVal,selectedIndex)
  $(".picker_marriage input").val(data3[selectedIndex[0]].name).attr("data-val",selectedVal);
});
$(".picker_marriage").click(function(){
  picker3.show();
  pickerNum = 3;
})
//政治面貌
var data4 = this.formData.political;
var picker4 = new Picker({
  data: [data4]
});
picker4.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data4,selectedVal,selectedIndex)
  $(".picker_politics input").val(data4[selectedIndex[0]].name).attr("data-val",selectedVal);
});
$(".picker_politics").click(function(){
  picker4.show();
  pickerNum = 4;
})
//裸眼视力左眼
var data5 = this.formData.vision;
var picker5 = new Picker({
  data: [data5]
});
picker5.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data5,selectedVal,selectedIndex)
  $(".picker_left input").val(data5[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_left").click(function(){
  picker5.show();
  pickerNum = 5;
})
//裸眼视力右眼
var data6 = this.formData.vision;
var picker6 = new Picker({
  data: [data6]
});
picker6.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data6,selectedVal,selectedIndex)
  $(".picker_right input").val(data6[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_right").click(function(){
  picker6.show();
  pickerNum = 6;
})
//普通话水平
var data7 = this.formData.mandarin;
var picker7 = new Picker({
  data: [data7]
});
picker7.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data7,selectedVal,selectedIndex)
  $(".picker_chinese input").val(data7[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_chinese").click(function(){
  picker7.show();
  pickerNum = 7;
})
//最高学历
var data8 = this.formData.education;
var picker8 = new Picker({
  data: [data8]
});
picker8.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data8,selectedVal,selectedIndex)
  $(".picker_education input").val(data8[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_education").click(function(){
  picker8.show();
  pickerNum = 8;
})
//工作经验
var data9 = this.formData.offerExperience;
var picker9 = new Picker({
  data: [data9]
});
picker9.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data9,selectedVal,selectedIndex)
  $(".picker_exp input").val(data9[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_exp").click(function(){
  picker9.show();
  pickerNum = 9;
})
//任职状态
var data10 = this.formData.offerState;
var picker10 = new Picker({
  data: [data10]
});
picker10.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data10,selectedVal,selectedIndex)
  $(".picker_offer_state input").val(data10[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_offer_state").click(function(){
  picker10.show();
  pickerNum = 10;
})
//英语
var data11 = this.formData.english;
var picker11 = new Picker({
  data: [data11]
});
picker11.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data11,selectedVal,selectedIndex)
  $(".picker_english input").val(data11[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_english").click(function(){
  picker11.show();
  pickerNum = 11;
})
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
$(".js_two").click(function(){
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
    console.log("民族")
    return;
  }else if(!birthplace){
    console.log("籍贯")
    return;
  }else if(!wedding){
    console.log("婚姻")
    return;
  }else if(!politics){
    console.log("政治")
    return;
  }else if(!/^[12][0-9]{2}$/.test(height)){
    console.log("身高")
    return;
  }else if(!/^[0-9]{2,3}$/.test(weight)){
    console.log("体重")
    return;
  }else if(!vision_left){
    console.log("左眼")
    return;
  }else if(!vision_right){
    console.log("右眼")
    return;
  }else if(!mandarin){
    console.log("普通话")
    return;
  }else if(!english){
    console.log("英语")
    return;
  }else if(!language){
    console.log("小语种")
    return;
  }else if(!education){
    console.log("学历")
    return;
  }else if(!experience){
    console.log("经历")
    return;
  }else if(!employ){
    console.log("任职")
    return;
  }else if(!/^1[34578][0-9]{9}$/.test(tel)){
    console.log("电话")
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
  }
  console.log(res)
}
function linkInit(res){
  if(res.code == 1){
    updateSuc();
  }
  console.log(res)
}
function baseInit(res){
  if(res.code == 1){
    updateSuc();
  }
  console.log(res)
}
function updateSuc(){
  updateNum = updateNum + 1;
  if(updateNum == 3){
    window.location.href = "stepThree.html"
  }
}