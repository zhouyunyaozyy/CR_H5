getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
function initMy(res){
  if(res.code == 1){
    $(".phone_num").text(res.data.mobile)
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