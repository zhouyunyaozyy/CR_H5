getCallBack({},"/dabai-chaorenjob/seeker/getUserSeekerInfo",initMy)
function initMy(res){
  if(res.code == 1){
    $(".phone_num").text(res.data.mobile)
  }else if(res.code == 10002){
    popupType = 2;
    showPopup("请重新登录")
  }else{
    popupType = 1;
    showPopup(res.msg)
  }
  console.log(res)
}