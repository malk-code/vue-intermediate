/**
 * Created by saber on 2017/3/4.
 */

export default {
  rem: function pl() {
//设置一个获取屏幕宽度并赋值的函数
//        获取屏幕宽度并赋值给自定义变量w
    var w = document.documentElement.offsetWidth;
    var f=null;
    if(320<w&&w<562){
      f=w/375 * 100;
    }else if(w>=562){
      f=150;
    }else if(w<=320){
      f=86;
    }
    // 把计算过得fontSize加上px赋值给html标签的font-size
    document.documentElement.style.fontSize = f+ "px";
    console.log("屏宽",w,";","1rem=",f+"px");
  }
}

// 调用这个函数
//pl();
//    设置监听浏览器大小有没有发生改变，如果发生了改变就调用pl（）
//window.onresize = function() {
//  pl();
//}
