import Vue from 'vue'
import App from './App.vue'

// 9. import 导入模块，如路由，组件，状态。若文件夹子下存在 index 文件，默认会识别并导入，且在导入文件的时候，编译会主动识别文件类型，即导入还可省略文件后缀。
import Rem from './utils/layout/rem.js'
import router from './router'
import native from './utils/bridge/native.js'
import store from './store'

// ES6 模板语法：http://es6.ruanyifeng.com/#docs/module#import-%E5%91%BD%E4%BB%A4
// 若是import 不是 export default 模块，则需要使用花括号包含引入变量，可用 as 为引入变量取别名。可以在一个文件内导出多个目标：方法，变量，模板
import { Person as propsvue } from "./utils/config/constructor.js"

//项目不能新增依赖，尝试删掉依赖包，重新npm install

Rem.rem();
window.native = native;
window.person = propsvue;

//路由的钩子函数
router.afterEach((to, from, next) => {
	document.title = to.meta.title;
});

/* 2. vue 全局公用函数 - 调用在 vux-plugin.vue
	1. 如果需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上。注册在 main.js 内 Vue.prototype.$method = function () {}；
	2. 一般建议函数名使用 $ 前缀。像 vue-router 的 $route 和 $router。可考虑传参让挂载方法具有多用性。挂载到 prototype 上是为了方便组件内直接用 this.$method 来使用。
*/
Vue.prototype.$method = function() {
	alert('如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上。');
}
Vue.prototype.$updatetitle = (params) => {
	alert(document.title + " To " + params);
	document.title = params;
};

// vux可选配置1，添加 Fastclick 移除移动端点击延迟
const FastClick = require('fastclick');
FastClick.attach(document.body);

new Vue({
	store: store,
	router: router,
	render: h => h(App)
}).$mount('#app')