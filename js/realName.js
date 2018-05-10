var search = url_analysis(window.location.search)
var popupType;
getCallBack({},"/dabai-chaorenjob/certification/getCertificationOfMine",initState)
getCallBack({},"/dabai-chaorenjob/common/qiniu/token",initToken)
var imgToken;
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
$(function(){
  if(search.jid){
    $(".back").attr("href","jobDetail.html?jid=" + search.jid)
  }
})
function initState(res){
  console.log(res)
  if(res.code == 1){
    if(res.data){
      switch (res.data.status){
        case 1:
          $(".fail_cont").remove();
          $(".state_name").remove();
          $(".suc_cont .state_img img").attr("src","img/audit2.png")
          $(".auth_item:first-child img").attr("src",res.data.front_url)
          $(".auth_item:last-child img").attr("src",res.data.back_url)
          $(".auth_name").text(res.data.name)
          $(".auth_card_id").text(res.data.idno.slice(0,6) + "********" + res.data.idno.slice(-4))
          break;
        case 4:
          $(".fail_cont").remove();
          $(".state_info").remove();
          $(".suc_cont .state_img img").attr("src","img/pass.png")
          $(".auth_item:first-child img").attr("src",res.data.front_url)
          $(".auth_item:last-child img").attr("src",res.data.back_url)
          $(".auth_name").text(res.data.name)
          $(".auth_card_id").text(res.data.idno.slice(0,6) + "********" + res.data.idno.slice(-4))
          break;
        case 8:
          $(".suc_cont").remove();
          $(".refuse_info").text(res.data.mark)
          $(".js_card_id").val(res.data.idno)
          $(".js_card_name").val(res.data.name)
          $(".js_front_photo").attr({
            "data-key":res.data.card_front_url,
            "src":res.data.front_url
          })
          $(".js_back_photo").attr({
            "data-key":res.data.card_back_url,
            "src":res.data.back_url
          })
          break;
        default:
          break;
      }
    }else{
      $(".suc_cont").remove();
      $(".fail_cont_top").remove();
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
function update (ipt){
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
      getCallBack({},"/dabai-chaorenjob/common/qiniu/url/"+res.key,changeImg,{ipt:ipt,key:res.key})
    }
  })
}
function changeImg(res,obj){
  if(res.code == 1){
    $(obj.ipt).siblings("img").attr({
      "src":res.data,
      "data-key":obj.key
    })
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
$(".cart_cont").on("change",".photo_file",function(){
  update(this)
})
$(".submit_btn").click(function(){
  var idno = $(".js_card_id").val();
  var name = $(".js_card_name").val();
  var card_front_url = $(".js_front_photo").attr("data-key");
  var card_back_url = $(".js_back_photo").attr("data-key");
  if(!idno){
    popupType = 1;
    showPopup("身份证号不能为空")
    return;
  }else if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idno)){
    popupType = 1;
    showPopup("请输入正确身份证号")
    return;
  }else if(!name){
    popupType = 1;
    showPopup("真实姓名不能为空")
    return;
  }else if(!/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,5}$/.test(name)){
    popupType = 1;
    showPopup("真实姓名只能是2-5位中文")
    return;
  }else if(!card_front_url){
    popupType = 1;
    showPopup("请选择身份证正面照")
    return;
  }else if(!card_back_url){
    popupType = 1;
    showPopup("请选择身份证反面照")
    return;
  }
  var postData = {
    idtype:1,
    idno:idno,
    name:name,
    card_front_url:card_front_url,
    card_back_url:card_back_url
  }
  postCallBack(postData,"/dabai-chaorenjob/certification/insertAudit",insertAudit)
})
function insertAudit(res){
  if(res.code == 1){
    window.location.reload()
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