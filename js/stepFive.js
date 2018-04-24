getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var target,znConfig;
function initResume(res){
  if(res.code == 1){
    target = res.data.target;
    getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc)
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
          $(".video_title").removeClass("optional").find("span").text("(±ØÌî)")
        }else{
          $(".video_title").addClass("optional").find("span").text("(Ñ¡Ìî)")
        }
        return;
      }
    }
  }
}
var pickerNum;
//Ó¢Óï
var data1 = this.formData.english;
var picker1 = new Picker({
  data: [data1]
});
picker1.on('picker.select', function (selectedVal, selectedIndex) {
  console.log(data1,selectedVal,selectedIndex)
  $(".picker_english input").val(data1[selectedIndex[0]].name).attr("data-val",selectedVal);;
});
$(".picker_english").click(function(){
  picker1.show();
  pickerNum = 1;
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