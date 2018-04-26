var search = url_analysis(window.location.search)
getCallBack({},"/dabai-chaorenjob/common/qiniu/token",initToken)
getCallBack({},"/dabai-chaorenjob/resume/getMyResumeVo",initResume)
var imgToken;
var sucNum = 0;
var imgNum = 1;
function initToken(res){
  if(res.code == 1){
    imgToken = res.data;
  }
  console.log(res)
}
function initResume(res){
  if(res.code == 1) {
    if(search.type != 1 && search.type != 2){
      switch (res.data.steps){
        case 100:
          alert("请先填写第一步")
          return;
        case 200:
          alert("请先填写第二步")
          return;
        case 300:
          alert("请先填写第三步")
          return;
        case 400:
          alert("请先填写第四步")
          return;
        case 500:
          alert("请先填写第五步")
          return;
        case 600:
          alert("请先填写第六步")
          return;
        case 700:
          alert("请修改原简历，不能新增简历")
          return;
        default:
          alert("请先创建简历")
          return;
      }
    }
    if(search.type != 2){
      $(".profile_cont textarea").val(res.data.profile);
    }else{
      $(".disc_title").remove();
      $(".profile_cont").remove();
      $(".back").attr("href","modifyResume.html")
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
      $(".back").attr("href","modifyResume.html")
      $(".title").text("自我描述")
      $(".js_six").text("确认")
    }
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
  '<div class="cert_item_name"><span>证书名称</span><input type="text" value="' +
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
    alert("请选择jpg或png格式图片")
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
  }
  console.log(res)
}
$(".five_add_btn").click(function(){
  if(imgNum < 6){
    var html = certText();
    imgNum = imgNum + 1;
    $(this).before(html)
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
$(".js_six").click(function(){
  var skill = [];
  var profile = $(".profile_cont textarea").val();
  if(!profile && search.type != 2){
    return;
  }
  console.log(imgNum)
  if(search.type != 1){
    var key1 = $(".six_cert_item:eq(0)").find(".three_img_cont img").attr("data-key");
    var zName1 = $(".six_cert_item:eq(0)").find(".cert_item_name input").val();
    if(imgNum >1 || key1 || zName1){
      for(var i = 0;i<imgNum;i++){
        var key = $(".six_cert_item").eq(i).find(".three_img_cont img").attr("data-key");
        var zName = $(".six_cert_item").eq(i).find(".cert_item_name input").val();
        if(!key){
          console.log(i,key)
          return;
        }else if(!zName){
          console.log(i,zName)
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
  }
  console.log(res)
}
function submitAudit(res){
  if(res.code == 1){
    window.location.href = "resumeDetail.html"
  }
}