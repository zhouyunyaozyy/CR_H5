(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }
    docEl.style.fontSize = 10 * (clientWidth / 200) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
function url_analysis(url){
  if(url){
    var url_arr = url.slice(1).split("&");
    var obj = {};
    for(var i = 0 ;i<url_arr.length;i++){
      var item = url_arr[i].split("=");
      obj[item[0]] = item[1];
    }
    return obj;
  }else{
    return {}
  }
}
//解析
function parsing(val){
  var str=val;
  var arr=str.split("&lt;");
  str=arr.join("<");
  arr=str.split("&gt;");
  str=arr.join(">");
  arr=str.split("&amp;");
  str=arr.join("&");
  arr=str.split("&quot;");
  str=arr.join('"');
  arr=str.split("&nbsp;");
  str=arr.join(" ");
  return str;
}
//判断是否微信浏览器
function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}
var ticket = window.sessionStorage.getItem("ticket");
var ticketsSalt = window.sessionStorage.getItem("ticketsSalt");
//加密token
function token (){
  var resultData = 0
  if(ticketsSalt){
    var postTime = ''+(Date.parse(new Date()))// 时间戳
    var postVersion = rndRandom(20) // uuid随机数
    var base64DataBefore = {
      tickets: window.sessionStorage.getItem('ticket'),
      postVersion: postVersion,
      postTime:postTime,
      appVersion: 1,
      platform: window.sessionStorage.getItem('platform')
    }
    // sessionSalt="sessionSalt"&postVersion="UUid 随机数"&postTime="时间戳"&platform="平台名称"&clientUid="机器唯一编码"
    var hmacDataBefore = 'ticketsSalt=' + ticketsSalt+'&postVersion='+postVersion+'&postTime='+postTime+'&platform='+window.sessionStorage.getItem('platform')+'&clientUid='+window.sessionStorage.getItem('clientUid')
    console.log('hmacDataBefore', hmacDataBefore)
    var hmacData = CryptoJS.HmacSHA1(hmacDataBefore, ticketsSalt)
    var base = new Base64();
    var base64Data = base.encode(JSON.stringify(base64DataBefore))
    resultData = base64Data+'.'+hmacData
  }
  console.log(resultData)
  return resultData;
}
//接口公共url
//var locationIp =  'http://192.168.1.115:5020';
var locationIp =  'http://api.chaorenjob.com';
var resourceUrl = "http://h5.chaorenjob.com"
//var resourceUrl = "http://192.168.1.115:5020/dabai-page"
//ajax
function getCallBack(data,url,success,isData){
  var resultData = token();
  var all_url = locationIp + url;
  $.ajax({
    type:'get',
    headers: {
      "Content-Type": "application/json ",
      "Accept" : "*/*",
      'CR-token': resultData},
    url:all_url,
    dataType: "json",
    data:data,
    success:function(data){
      success(data,isData)
    }
  });
}
function postCallBack(data,url,success,isData){
  var resultData = token();
  var all_url = locationIp + url;
  console.log(resultData)
  $.ajax({
    type:'post',
    contentType: "application/json;charset=UTF-8",
    dataType:"json",
    headers: {
      "Accept" : "*/*",
      'CR-token': resultData},
    url:all_url,
    data:JSON.stringify(data),
    success:function(data){
      success(data,isData)
    }
  });
}
//Base64
function Base64() {

  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
//rndRandom
function rndRandom (size) {
  var rnd = {}
  rnd.size = size
  rnd.list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  rnd.val = '' // key
  for (var i = 0; i < rnd.size; ++i) {
    var tmp = parseInt((rnd.list.length) * Math.random())
    if (i === 7) {
      if (tmp % 2 === 0) {
        rnd.val += '_'
      } else {
        rnd.val += rnd.list[tmp] + '_'
        rnd.list.splice(tmp, 1)
        i++
      }
    } else {
      rnd.val += rnd.list[tmp]
      rnd.list.splice(tmp, 1)
    }
  }
  return rnd.val
}
//加密
var aesData = {
  pageStatus: '',
  jiamiData: '',
  validationUid: '',
  newValidationUid: '',
  key: '',
  oldVerification: ''
}
function jiami ( msg) {
  var beforeKey = rndRandom(16)
  aesData.key = beforeKey
//        rnd.val = Base64.encode(rnd.val)
  var data = {}
  if (aesData.pageStatus === 'reg' || aesData.pageStatus === 'forget' || aesData.pageStatus === 'login') {
    // 获取浏览器信息
    var explorer = window.navigator.userAgent.toLowerCase()
    console.log(explorer)
    // ie
    if (explorer.indexOf('msie') >= 0) {
      var ver = explorer.match(/msie ([\d.]+)/)[1]
      data.client = 'IE'
      data.clientVersion = ver
    } else if (explorer.indexOf('firefox') >= 0) { // firefox
      var ver = explorer.match(/firefox\/([\d.]+)/)[1]
      data.client = 'Firefox'
      data.clientVersion = ver
    } else if (explorer.indexOf('chrome') >= 0) { // Chrome
      var ver = explorer.match(/chrome\/([\d.]+)/)[1]
      data.client = 'Chrome'
      data.clientVersion = ver
    } else if (explorer.indexOf('opera') >= 0) { // Opera
      var ver = explorer.match(/opera.([\d.]+)/)[1]
      data.client = 'Opera'
      data.clientVersion = ver
    } else if (explorer.indexOf('safari') >= 0) { // Safari
      var ver = explorer.match(/safari\/([\d.]+)/)[1]
      data.client = 'Safari'
      data.clientVersion = ver
    } else if (explorer.indexOf('micromessenger') >= 0) { // Safari
      var ver = explorer.match(/micromessenger\/([\d.]+)/)[1]
      data.client = 'Micromessenger'
      data.clientVersion = ver
    }
    window.sessionStorage.setItem('platform', 'DABAI_CHAORENJOB_C_H5')
    // 判断本地是否有clintUid
    if (window.sessionStorage.getItem('clientUid')) {
      data.clientUid = window.sessionStorage.getItem('clientUid')
    } else {
      data.clientUid = Guid.create().value
      window.sessionStorage.setItem('clientUid', data.clientUid)
    }
    if (aesData.pageStatus === 'reg') {
      data.verificationId = aesData.validationUid
      data.mobile = msg.mobile
      data.password = msg.password
      data.verificationCode = msg.verificationCode
    }
    if (aesData.pageStatus === 'forget') {
      data.postVersion = aesData.validationUid + '.' + msg.num
    } else if (aesData.pageStatus === 'login') {
      data.username = msg.username
      data.password = msg.password
      data.platform = 'DABAI_CHAORENJOB_C_H5'
    }
  } else if (aesData.pageStatus === 'newPhone') { // 更换手机号
//        oldMobile:"旧的手机号"
//        newMoblie:"新的手机号"
//        postVersion:"validationUid.验证码.validationUid.验证码"  // validationUid + "." + 验证码 一共有两段 第一段 是旧手机 + 验证码，第二段是新手机加验证码
    data.oldMobile = window.sessionStorage.getItem('userPhone')
    data.newMoblie = msg.phone
    data.postVersion = aesData.validationUid + '.' + aesData.oldVerification + '.' + aesData.newValidationUid + '.' + msg.verification
  } else if (aesData.pageStatus === 'newPwd') {
    data.oldPassWord = msg.oldPassword
    data.newPassWord = msg.newPassWord
  }
  var resultData = {}
  // aes加密
  resultData.content = (function () {
    var key = CryptoJS.enc.Utf8.parse(beforeKey)
    var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
    return encrypted.toString() // 返回的是base64格式的密文
  })()
  // RSA加密
  var encrypt = new JSEncrypt()
  var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdIIlQzv3fb9ktUGphZ/4l0qQ87iMxLjn1Rc3yhWL0KlnTSY/tziRi0XRyoSCBovZe1hhWGXnfwSvgJRvkzBWRHrnGor0+6I18DnY1lnrckp6bmjirX0BvdqFWxmXgIoz985YjLnPGNqBzt58EBdC5YqUYYnATRgKMA4g0N0Cd6QIDAQAB'
  encrypt.setPublicKey(publicKey)
  resultData.aesKey = encrypt.encrypt(beforeKey) // RSAkey
  console.log(beforeKey,encrypt.encrypt(beforeKey))
  aesData.jiamiData = resultData
}
//解密
function jieMi (msg) { // 解密
  var key = CryptoJS.enc.Utf8.parse(aesData.key)
  var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
  var decrypted = CryptoJS.AES.decrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  window.sessionStorage.setItem('ticket', decrypted.toString(CryptoJS.enc.Utf8).split('.')[0])
  window.sessionStorage.setItem('ticketsSalt', decrypted.toString(CryptoJS.enc.Utf8).split('.')[1])
  ticketsSalt = window.sessionStorage.getItem('ticketsSalt');
}
function address (code,type){
  //console.log(code,type)
  if(!code || !type){
    return "";
  }
  var code = code+""
  var province,city,area;
  for(var a = 0;a<areaList.length;a++){
    if(areaList[a].code == code.slice(0,2)+"0000"){
      province = areaList[a].name;
      //console.log(areaList[a])
      if(type == 1){
        return province;
      }
      for(var b = 0;b<areaList[a].children.length;b++){
        if(areaList[a].children[b].code == code.slice(0,4)+"00"){
          city = areaList[a].children[b].name;
          if(type == 2){
            return city;
          }
          for(var c = 0; c < areaList[a].children[b].children.length;c++){
            if(areaList[a].children[b].children[c].code == code){
              area = areaList[a].children[b].children[c].name;
              if(type == 3){
                return area;
              }
            }
          }
        }
      }
    }
  }
  if(type == 4){
    return province + " " + city + " " + area
  }
}
function formatDate(time,type){
  var date = new Date(parseInt(time));
  switch (type){
    case 1:
      return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
    case 2:
      return date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes()
  }
}
function formatData(code,type){
  if(code == ""){
    return ""
  }
  var dataList = formData[type];
  if(!dataList){
    return "";
  }
  for(var i = 0;i<dataList.length;i++){
    if(dataList[i].code == code){
      return dataList[i].name;
    }
  }
}
//打开弹窗
function showPopup(msg,type){
  $(".popup_txt").text(msg);
  if(type == 1){
    $(".popup_hide").css("display","none")
    $(".popup_err").css("display","block")
    $(".popup_suc").css("display","block")
  }else{
    $(".popup_hide").css("display","block")
    $(".popup_err").css("display","none")
    $(".popup_suc").css("display","none")
  }
  $(".popup_cont").css("display","block")
}
//关闭弹窗
function hidePopup(){
  $(".popup_txt").text("");
  $(".popup_cont").css("display","none")
}