<template>
	<div class="main">
		<h2>单元素/组件的过渡</h2>

		<h4>过渡的类名</h4>
		<transition name='fade'>
			<p v-if="fade">transition fade</p>
		</transition>
		<button @click="fade = !fade">fade transition</button>

		<transition name='slide-fade'>
			<p v-if="slide">transition slide-fade</p>
		</transition>
		<button @click="slide = !slide">fade transition</button>

		<h4>css 动画</h4>
		<transition name='bounce'>
			<p v-if="iscss">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
		</transition>
		<button @click="iscss = !iscss">css animation</button>

		<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
		<h4>自定义过渡的类名</h4>
		<transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
			<p v-if="custom">custom class depend animate.css</p>
		</transition>
		<button @click="custom = !custom">custom class</button>

		<h4>同时使用过渡和动画</h4>

		<h4>显性的过渡持续时间</h4>

		<h4>JavaScript 钩子</h4>
		<transition 
			v-on:before-enter="beforeEnter" 
			v-on:enter="enter" 
			v-on:after-enter="afterEnter" 
			v-on:enter-cancelled="enterCancelled" 
			v-on:before-leave="beforeLeave" 
			v-on:leave="leave" 
			v-on:after-leave="afterLeave" 
			v-on:leave-cancelled="leaveCancelled">
			<p v-if="hook">JavaScript 钩子实现动画</p>
		</transition>
		<button @click="hook = !hook">hook transition</button>
	</div>
</template>

<script>
	// https://cn.vuejs.org/v2/guide/transitions.html#%E6%A6%82%E8%BF%B0
	export default {
		data() {
			return {
				fade: true,
				slide: true,
				iscss: true,
				custom: true,
				hook: true,
			}
		},
		// ...
		methods: {
			// --------
			// 进入中
			// --------

			beforeEnter: function(el) {
				// ...
				el.style.opacity = 0
			},
			// 此回调函数是可选项的设置
			// 与 CSS 结合时使用
			enter: function(el, done) {
				// ...
				el.style.transition = 'opacity 0.5s';
				done()
			},
			afterEnter: function(el) {
				// ...
				el.style.opacity = 0;
			},
			enterCancelled: function(el) {
				// ...
			},

			// --------
			// 离开时
			// --------

			beforeLeave: function(el) {
				// ...
			},
			// 此回调函数是可选项的设置
			// 与 CSS 结合时使用
			leave: function(el, done) {
				// ...
				el.style.transition = 'opacity 0.5s';
				done()
			},
			afterLeave: function(el) {
				// ...
				el.style.opacity = 0;
			},
			// leaveCancelled 只用于 v-show 中
			leaveCancelled: function(el) {
				// ...
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		padding: .1rem;
		h4 {
			padding: .1rem 0rem;
		}
	}
	/*fade*/
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active below version 2.1.8 */
	
	{
		opacity: 0;
	}
	/*slide*/
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		transform: translateX(100px);
		opacity: 0;
	}
	/*css*/
	
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	
	.bounce-leave-active {
		animation: bounce-in .5s reverse;
	}
	
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
</style>