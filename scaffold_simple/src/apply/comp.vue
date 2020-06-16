<template>
	<div class="main">
		<!--13. 组件props：若直接传入不能使用冒号；冒号是绑定传入：显示和数据是同步的。它们在组件内都能通过props取到值。props支持多参，支持传入对象，可为传入对象的属性添加验证-->
		<navigation url="http://192.168.2.101:8020/WEB/Vue/vuejs/sample/learn-basics/9-components.html">动态组件基础</navigation>

		<!--
		    	1. css绑定，可直接使用判断条件，Bool值没有必要再定义方法出来：简单的方法和css的Bool值绑定，直接在标签上即可实现方法，标签可直接访问data内数据，即省略了this。
		    2. keep-alive标签：组件消失，不会失活，下次使用会保存之前的状态，正常标签重新出现则会每次重新渲染：就是原生全局控件和局部控件使用区别。
		    3. 在组件的 component 上指定需要动态切换的模板/组件，再通过 v-bind:is 绑定需要显示的组件。 一般import 一个组件，会直接将组件名称声明在components内，不加key。此处要加
		-->
		<h4>keepalive 标签的使用：</h4>
		<keepalive></keepalive>

		<br />
		<hr />
		<h4 style="color: red;">项目不能新增依赖，尝试删掉依赖包，重新npm install</h4>
		<p>备注：直接定义一个 const 接收 require() 或者 import() 得到 node  包的文件对象，不能使用于组件。可在 webpack.config.js 得到其用法。</p>
		<hr />
		<br />

		<h4>异步组件：</h4>
		<h4>使用 require 语法：</h4>
		<p>延迟1s：
			<!--若未在 components 内引用该变量，那其实动态组件就是注册为了全局组件：可直接使用注册的组件名称创建，引用该变量则可以通过该变量名称创建控件，-->
			<async-comp></async-comp>
		</p>
		<br />
		<div>
			<asyncone v-if='asyncswitch'></asyncone>
			<asynctwo v-else></asynctwo>
			<button @click="asyncswitch = !asyncswitch">asyncswitch</button>
		</div>
		<br />
		<p>局部注册</p>
		<asyncthree></asyncthree>

		<br />
		<h4>在组件内使用 () => import('') 语法：</h4>
		<p>	使用：在路由中返回 component：() => import('')；在组件内使用需要添加 System 前缀 () => System.import('')。</p>

		<br />
		<p>全局注册</p>
		<!--若未在 components 内引用该变量，那其实动态组件就是注册为了全局组件：可直接使用注册的组件名称创建，引用该变量则可以通过该变量名称创建控件，-->
		<asyncpromise></asyncpromise>
		<async-promise></async-promise>

		<p>局部注册</p>
		<asyncpromisepart></asyncpromisepart>

		<!--性能：加载一次后会做缓存，但若同时以异步和同步方式加载一个组件，会导致组价被加载两次：单独建立懒加载和同步加载的文件夹组件。-->
		<br />
		<h4>处理加载状态：高级组件</h4>
	 	<asynadvanced></asynadvanced>
	</div>
</template>

<script>
// 1. 声明式导入：import xx from '../components/xx.vue'; 在编译期执行，会被提升到文件的顶部进行导入，预加载；编译期执行意味着不能添加任意的 js 判断代理，且不是懒加载。
const navigation = r => require(["../components/slot/navigation-link.vue"], r);
const keepalive = () => System.import("../components/comp/v-keep-alive.vue");

/* 46. 异步组件
	    1. Vue 允许以一个工厂函数的方式定义组件，这个工厂函数会异步解析组件的定义。Vue 只有在这个组件需要被渲染的时候才会被触发，且会把结果缓存起来供未来重渲染。
	    2. import 是模板编译指令，会提升到文件顶部执行，且是编译期运行；import() 是运行时异步加载，返回一个promise，require 也是运行时加载，但是同步加载，她俩都是懒加载。
	    3. 组件的异步加载方式，会在首次需要用到组件时浏览器会发送请求加载组件，加载完将会缓存起来，以供之后再次用到该组件时调用：组件也是一个请求，在WebView解析页面时。
	    4. 若同时以异步和同步方式加载组件，此时组价被加载两次，造成资源重用：建议单独建立懒加载和同步加载的文件夹组件 — 组件的同步和异步加载取决于加载方式，和组件本身无关。
	    5. 异步组件的注册：组件注册分为局部注册和全局注册
	        1. 全局注册，也会返回组件对象，此时可直接使用注册的组件名称创建；若接受且放入父组件的 components 内，此时也可以将 components 内引用组件的 key 创建全局组件。
	        2. 局部注册，更建议将组件注册为局部组件，require 和 import() 都是类似于调用方法，加载异步组件。都支持 ES6 的箭头函数写法，require 默认支持，import() 需要配置 plugin。
	    6. 异步组件的加载
	        1. 组件的同步和异步加载取决于加载方式，和组件本身无关。import() 可结合 promise 使用，更好控制，且是异步懒加载。promise 支持 then，可做容错，等待处理。
	        2. import() 是运行时异步加载，返回一个promise，require 也是运行时加载，但是同步加载。她俩都是懒加载，是异步组件的基础，也是配置懒加载路由的方式。
	        3. import() 是babel的syntax-dynamic-import 插件，配置成功后可在路由中返回 component：() => import('')；在组件内使用需要添加 System 前缀 () => System.import(‘’)
	        4. require 默认是可使用的，且和 import() 并不冲突，在 router 内配置了 import require import() 格式路由，均得到支持正常加载。
	        5. 使用加载异步组件，建议局部注册，最简写法是在 components 新增一个 key 接收 resolve => require([''], resolve) 和 () => import('')，避免使用全局注册。使用通过 key 创建标签
	    7. 原理：
	        1. require：组件注册方法，这个工厂函数会收到一个 resolve 回调，这个回调函数会从服务器得到组件定义的时候被调用。也可以调用 reject(reason) 来表示加载失败。
	        2. import()：在工厂函数中返回一个 Promise，需要插件支持，且在组件内需要为 import 添加 System 前缀；当使用局部注册时，也可以直接提供一个返回 Promise 的函数得到组件
	*/

import Vue from "vue";

// 若未在 components 内引用该变量，那其实动态组件就是注册为了全局组件：可直接使用注册的组件名称创建，引用该变量则可以通过该变量名称创建控件，

const asynccomp = Vue.component("async-comp", (resolve, reject) => {
  setTimeout(function() {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: "<div>I am async!</div>"
    });
  }, 1000);
});
// 这个工厂函数会收到一个 resolve 回调，这个回调函数会从服务器得到组件定义的时候被调用。也可以调用 reject(reason) 来表示加载失败。这里的 setTimeout 是为了演示用。

// 使用模块

const asyncone = Vue.component("async-one", function(resolve) {
  setTimeout(function() {
    require(["../components/comp/v-async-one.vue"], resolve);
  }, 3000);
});
const asynctwo = Vue.component("async-two", resolve =>
  require(["../components/comp/v-async-two.vue"], resolve)
);

// 使用：在路由中返回 component：() => import('')；在组件内使用需要添加 System 前缀 () => System.import('')。
let asyncpromise = Vue.component("async-promise", () =>
  System.import("../components/comp/v-async-promise.vue")
);

// 处理加载状态：高级组件：
// 2. import()：在工厂函数中返回一个 Promise，需要插件支持，且在组件内需要为 import 添加 System 前缀；当使用局部注册时，也可以直接提供一个返回 Promise 的函数得到组
const asynadvanced = () =>
  System.import("../components/comp/v-async-promise-advance.vue");

export default {
  data() {
    return {
      asyncswitch: false
    };
  },
  components: {
    navigation,
    keepalive,

    asyncone,
    asynctwo,
    // 使用局部注册：require 实现，需要为返回组件添加KEY，避免了全局注册 asyncone 和 asynctwo
    asyncthree: r => require(["../components/comp/v-async-three.vue"], r),
    // 使用：在路由中返回 component：() => import('')；在组件内使用需要添加 System 前缀 () => System.import('');
    asyncpromise,
    asyncpromisepart: () =>
      System.import("../components/comp/v-async-promise-two.vue"),
    // promise 状态管理
    asynadvanced
  },
  mounted() {
    let title = this.$route.meta.title;
    document.title = title;
  }
};
</script>

<style scoped="scoped">
.main {
  margin: 0.1rem;
}

h4 {
  margin: 0.05rem 0rem;
}
</style>
