<style scoped="scoped" lang="less">
	.main {
		padding: .1rem;
	}
</style>

<template>
	<div class="main">
		<mt-button type="default" @click="toast">toast</mt-button>
		<mt-button type="default" @click="loading">loading</mt-button>
		<br /><br />
		<mt-button type="default" @click="showMessageBox">{{ messageBox }}</mt-button>
		<mt-button type="default" @click="showAlert">{{ alert }}</mt-button>
		<mt-button type="default" @click="showConfirm">{{ confirm }}</mt-button>
		<mt-button type="default" @click="showPrompt">{{ prompt }}</mt-button>

		<br /><br />
		<h4>vuex store:</h4>
		<label>{{ mapPayload }}</label>&nbsp;&nbsp;
		<mt-button type="default" @click="mapaction">{{ pro_mapaction }}</mt-button>
	</div>
</template>

<script>
	// 按需引入：和 vux 不太一样，1.没有插件引用，按需引入其实也是全局注册，而不是局部添加；弹出框无需注册引入即可用，但有些不是单例组件对象（基础组件建议在 app.vue 注册吧）
	import { Toast, Button, Indicator, MessageBox } from 'mint-ui';
	import { mapState, mapActions } from 'vuex';

	import Vue from 'vue';
	Vue.component(Button.name, Button);

	export default {
		components: {

		},
		data() {
			return {
				messageBox: 'messageBox',
				alert: 'alert',
				confirm: 'confirm',
				prompt: 'prompt',
				
				pro_mapaction: 'mapAction',
			}
		},
		computed: {
			...mapState({
				mapPayload: 'payload'
			}),
		},
		methods: {
			toast() {
				Toast({
					message: 'Upload Complete',
					position: 'bottom',
					duration: 750,
				});
			},
			loading() {
				Indicator.open({
					text: 'Loading...',
					spinnerType: 'triple-bounce'
				});
				setTimeout(() => Indicator.close(), 1000)
			},
			showMessageBox() {
				MessageBox('提示', '操作成功').then(action => {
					console.log(action);
				});
				return;

				MessageBox({
					title: 'Notice',
					message: 'Are you sure?',
					showCancelButton: true
				}).then(action => {
					console.log(action)
				});
			},
			showAlert() {
				MessageBox.alert('操作成功').then(action => {
					console.log(action)
				});
			},
			showConfirm() {
				MessageBox.confirm('确定执行此操作?').then(action => {
					console.log(action)
				}, error => {
					console.log(error)
				});
			},
			showPrompt() {
				MessageBox.prompt('请输入姓名').then(({
					value,
					action
				}) => {
					console.log(value)
					console.log(action)
				}, error => {
					console.log(error)
				});
			},

			...mapActions({
				mapAction: 'action_payload'
			}),
			// 映射处理
			mapaction() {
				this.pro_mapaction = 'delay 1s...';
				this.mapAction({
					'payload': 'map action modify'
				}).then(() => {
					this.pro_mapaction = 'mapaction';
					console.log('return is a promise.')
				});
			},
		}
	}
</script>