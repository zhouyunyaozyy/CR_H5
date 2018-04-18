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
var locationIp = "http://dzgx.joshuaweb.cn/index.php";
//var locationIp = "https://www.51dztg.com/index.php";
var version = 4;
var uid = window.localStorage.getItem("uid")
var token = window.localStorage.getItem("token")
function CallBack(data,url,success,isData){
  var all_url = locationIp + url;
  $.ajax({
    type:'post',
    url:all_url,
    data:data,
    success:function(data){
      success(data,isData)
    }
  });
}
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
function record_time(date){
  var time = new Date(date*1000);
  return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
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
function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}