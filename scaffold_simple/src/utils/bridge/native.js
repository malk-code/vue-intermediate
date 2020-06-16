/**
 * Created by pb on 2017/10/31.
 */
window.onerror = function (err) {
    //log ('window.onerror: ' + err)
    console.log('window.onerror: ' + err);
  }
  
  function connectWebViewJavascriptBridge (callback) {
    function isAndroid(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf ('Android') > - 1 || u.indexOf ('Adr') > - 1; //android终端
      return isAndroid
    }
  
    if (window.WebViewJavascriptBridge) {
      callback (WebViewJavascriptBridge,"建立桥连接1")
    }
    if(isAndroid()){
      document.addEventListener ('WebViewJavascriptBridgeReady' , function () {
        callback (WebViewJavascriptBridge,"建立桥连接2")
      } , false)
    }else{
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  }
  var XBK = {};
  connectWebViewJavascriptBridge (function (bridge,qiao) {
    console.log("提供init方法",qiao);
    try{ //此处try catch注意  android 有init初始化方法，必须调用 不调用后续注册的事件将无效 而IOS却没有init方法 调用会报错 所以得捕获异常
      bridge.init(function(message, responseCallback) {
        var data = {
          'Javascript Responds': '测试中文!'
        };
        responseCallback(data);
      });
    }catch(e){
      console.log('error',e);
    }
  
    bridge.registerHandler ('XueBankWebViewNativeBridge' , function (message , responseCallback) {
        console.log ("native主动调用js" , message)
        let messageData = JSON.parse(message);
        if(message.code == "0"){
          if(message.action == "StartRefresh"){
            window.that.StartRefresh();
          }
        }
        var data = {'state': 'OK！',code:0}
        responseCallback (data)
    });
  });

  //获取手机UUID（唯一性Id）
  XBK.UUID = function (color){
    var data = {'data': '' , 'action': 'UUID'}
    //console.log ('js 发送的数据' , data)
    console.log ('获取UUID');
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到的UUID' , JSON.parse(responseData));
      })
    });
  };
  //关闭页面
  XBK.PopViewController = function (){
    var data = {'data': "" , 'action': 'PopViewController'}
    //console.log ('js 发送的数据' , data)
    console.log ("关闭页面");
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到数据' , JSON.parse(responseData));
      })
    });
  };
  //分享
  XBK.ShareByUI = function (shareData){
    var data = {'data': shareData, 'action': 'ShareByUI'};
    console.log ("分享数据",shareData);
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到数据' , JSON.parse(responseData));
      })
    });
  };
  //打开带头的webView
  XBK.RetainNavigationBar = function (retain){
    var data = {'data': retain, 'action': 'RetainNavigationBar'};
    console.log(data);
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到数据' , JSON.parse(responseData));
      })
    });
  };
  //打开不带头的webView
  XBK.OpenNewWebView = function (retain){
    var data = {'data': retain, 'action': 'OpenNewWebView'};
    console.log(data);
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到数据' , JSON.parse(responseData));
      })
    });
  };
  //刷新一级页面
  XBK.StartRefresh = function (inData){
    var data = {'data': inData, 'action': 'StartRefresh'};
    console.log("刷新一级页面",data);
    connectWebViewJavascriptBridge (function (bridge) {
      bridge.callHandler ("XueBankWebViewJavascriptBridge",data , function (responseData) {
        console.log ('接收到数据' , JSON.parse(responseData));
      })
    });
  };

  export default XBK;
  