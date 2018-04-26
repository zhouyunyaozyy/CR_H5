getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",resumeInit)
var target,znConfig;
function resumeInit(res){
  if(res.code == 1){
    $(".title b").text("("+ res.data.percent +"%)")
    target = res.data.target;
    getCallBack({},'/dabai-chaorenjob/resumeTarget/getActiveResumeTarget',initFuc)
    var perfectModify = "";
    perfectModify += '<div class="modul_item"><div class="modul_label">求职意向<span>(必填)</span></div><a href="stepOne.html?type=1" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">基本信息<span>(必填)</span></div><a href="stepTwo.html?type=1" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">标准照<span>(必填)</span></div><a href="stepThree.html?type=1" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">图片形象<span>(必填)</span></div><a href="stepThree.html?type=2" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">视频形象<span>(必填)</span></div><a href="stepFour.html?type=1" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">教育经历<span>(必填)</span></div><a href="stepFive.html?type=1" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>' +
    '<div class="modul_item"><div class="modul_label">自我描述<span>(必填)</span></div><a href="stepSix.html?type=1"class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>'
    var noPerfectModify = "";
    var experience_item = JSON.parse(res.data.experience_item);
    if(experience_item.length > 0){
      perfectModify += '<div class="modul_item"><div class="modul_label blue">工作经历<span>(选填)</span></div><a  href="stepFive.html?type=2" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>'
    }else{
      noPerfectModify += '<div class="modul_item"><div class="modul_label blue">工作经历<span>(选填)</span></div><a  href="stepFive.html?type=2" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>'
    }
    if(res.data.skillUrl.length > 0){
      perfectModify += '<div class="modul_item"><div class="modul_label blue">证书<span>(选填)</span></div><a href="stepSix.html?type=2" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>'
    }else{
      noPerfectModify += '<div class="modul_item"><div class="modul_label blue">证书<span>(选填)</span></div><a href="stepSix.html?type=2" class="modul_edit">编辑<i class="iconfont icon-tiaozhuan"></i></a></div>'
    }
    $(".noPerfect_box").html(noPerfectModify)
    $(".perfect_box").html(perfectModify)
  }
  console.log(res)
}
function initFuc(res){
  if(res.code == 1){
    for(var i = 0;i<res.data.length;i++){
      if(res.data[i].rtid == target){
        znConfig = JSON.parse(res.data[i].config)
        console.log(znConfig)
        return;
      }
    }
  }
  console.log(res)
}