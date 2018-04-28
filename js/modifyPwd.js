$(".pwd_cont").on("paste","input",function(){
  $(this).blur();
})
$(".js_submit").click(function(){
  var pwd1 = $('.js_pwd1').val();
  var pwd2 = $('.js_pwd2').val();
  console.log(pwd1,pwd2,pwd1.length,pwd2.length)
  if(pwd1.length < 6 || pwd1.length > 12){
    return;
  }else if(pwd2.length < 6 || pwd2.length > 12){
    return;
  }else if(pwd1 == pwd2){
    return;
  }
  var nativeData = {}
  var encrypt = new JSEncrypt()
  var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'  // 从服务端接收到的公钥，缓存到本地
  encrypt.setPublicKey(publicKey)
  nativeData.oldPassword = encrypt.encrypt(pwd1)
  nativeData.newPassword = encrypt.encrypt(pwd2)
  postCallBack(nativeData,"/dabai-chaorenjob/seeker/changePassword",pwdResult)
})
function pwdResult(res){
  if(res.code == 1){
    window.location.href = "set.html"
  }
  console.log(res)
}