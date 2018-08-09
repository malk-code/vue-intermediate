<template>
	<div class="main">
		<h3>plugin:</h3>
		<br />
		<button @click="vux(1)">vux loading</button> &nbsp;&nbsp;&nbsp;
		<button @click="vux(0)">vux alert</button> &nbsp;&nbsp;
		<br />
		<br />
		<h4>vue 全局公用函数</h4>
		<button @click="$method()">vux prototype</button> &nbsp;&nbsp;
		<button @click="$updatetitle($route.meta.title)">prototype title</button> &nbsp;&nbsp;
		<br />
		<br />
		<h3>component</h3>
		<p style="color: red;">
			错误：scrip 模板的代码会走两次，这意味着在 export default 外的代码会被执行两次。经检查，在 simple / init 下配置 vux 都存在这个问题。-- export default 内一次，若做了懒加载，控件会被缓存，我认为性能影响有限吧
		</p>
		<msg>
			<template slot="buttons">
				<x-button plain type="primary" @click.native="vux(1)">hello</x-button>
				<x-button @click.native="vux(0)">world</x-button>
			</template>
		</msg>
	</div>
</template>

<script>
	console.log('script - 错误：scrip 模板的代码会走两次，这意味着在 export default 外的代码会被执行两次。经检查，在 simple / init 下配置 vux 都存在这个问题。-- export default 内一次，若做了懒加载，控件会被缓存，我认为性能影响有限吧');
	// 插件形式调用；还支持 全局注册，局部注册。全屏提示组件是单例组件对象
	import Vue from 'vue'
	import { LoadingPlugin, AlertPlugin } from 'vux'

	Vue.use(LoadingPlugin);
	Vue.use(AlertPlugin);

	import { Msg, XButton } from 'vux';

	export default {
		data() {
			return {

			}
		},
		components: {
			Msg,
			XButton,
		},
		methods: {
			vux(isloading) {
				if(isloading) {
					Vue.$vux.loading.show({
						text: '加载中',
					});
					setTimeout(() => this.$vux.loading.hide(), 1000);
				} else {
					// 获取显示状态
					console.log(this.$vux.alert.isVisible());

					let delay = setTimeout(() => {
						this.$vux.alert.hide();
						console.log(this.$vux.alert.isVisible());
					}, 3000);

					this.$vux.alert.show({
						title: 'Vux is Cool',
						content: 'Do you agree?',
						hideOnBlur: true,
						buttonText: 'sure',
						onShow() {
							console.log('Plugin: I\'m showing');
						},
						onHide() {
							clearInterval(delay);
							delay = null;
							console.log('Plugin: I\'m hiding');
						}
					});
					// 获取显示状态
					console.log(this.$vux.alert.isVisible());
				}
			},
		},
		mounted() {
			console.log('mounted - 错误：scrip 模板的代码会走两次，这意味着在 export default 外的代码会被执行两次。经检查，在 simple / init 下配置 vux 都存在这个问题。-- export default 内一次，若做了懒加载，控件会被缓存，我认为性能影响有限吧');
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin: .2rem .1rem;
	}
</style>