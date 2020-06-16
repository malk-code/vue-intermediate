<template>
	<div class="main">
		<h4>state:</h4>
		<label v-text="$store.state.count"></label>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count' :gradients="['red', 'blue']" :mini=true @click.native='stateCount'></x-button>&nbsp;&nbsp;

		<h4>commit:</h4>
		<label v-text="$store.state.count"></label>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count++' :gradients="['red', 'blue']" :mini=true @click.native='storeCount(1)'></x-button>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count--' :gradients="['red', 'blue']" :mini=true @click.native='storeCount(0)'></x-button>

		<h4>actions:</h4>
		<label v-text="$store.state.count"></label>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count++' :gradients="['red', 'blue']" :mini=true @click.native='storeActionCount(1)'></x-button>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count--' :gradients="['red', 'blue']" :mini=true @click.native='storeActionCount(0)'></x-button>

		<h4>getters</h4>
		<label v-text="$store.getters.count_info"></label>&nbsp;&nbsp;

		<h4>map: state actoins getters</h4>
		<label v-text="mapCount"></label>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count++' :gradients="['red', 'blue']" :mini=true @click.native='plus'></x-button>&nbsp;&nbsp;
		<x-button class='button' type='primary' text='count--' :gradients="['red', 'blue']" :mini=true @click.native='minus'></x-button>&nbsp;&nbsp;
		<label v-text="count_info"></label>

		<h4>payload</h4>
		<label>{{ mapPayload }}</label>
		<br />
		<x-button class='button' type='primary' text='commit' :gradients="['red', 'blue']" :mini=true @click.native='commit'></x-button>&nbsp;&nbsp;
		<x-button class='button' type='primary' :text='pro_dispatch' :gradients="['red', 'blue']" :mini=true @click.native='dispatch'></x-button>&nbsp;&nbsp;
		<x-button class='button' type='primary' :text='pro_mapaction' :gradients="['red', 'blue']" :mini=true @click.native="mapaction"></x-button>

		<hr style="margin-top: .3rem; margin-bottom: .3rem;" />
		<!--19. a 标签 href="javascript:;"，其中javascript:是伪协议，它可以让我们通过一个链接来调用javascript函数。而采用这个方式 javascript:; 可以实现A标签的点击事件运行时，执行js代码-->
		<a href="javascript:alert('href 执行 js 代码.');">href -- javascript:;</a> &nbsp;&nbsp;&nbsp;
		<!--2. 若在 href 直接写入 javascript:; 则是获得 a 标签的样式，但 href 被拦截，绑定 onclick 事件，在事件内执行 js 代码也能有绑定直接在 href 绑定的效果，目的是获得 a 标签的样式-->
		<a href="javascript:;" @click="aToAlert">javascript:; -- onclick</a>
	</div>
</template>

<script>
	import { XButton } from 'vux';
	import { mapState, mapActions, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				pro_dispatch: 'dispatch',
				pro_mapaction: 'mapaction',
			}
		},
		computed: {
			...mapState({
				'mapCount': 'count',
				mapPayload: 'payload'
			}),
			...mapGetters(['count_info'])
		},
		components: {
			XButton,
		},
		methods: {
			stateCount() {
				this.$store.state.count = 10;
			},
			storeCount(isincrement) {
				if(isincrement) {
					this.$store.commit('increment')
				} else {
					this.$store.commit('decrement')
				}
			},
			storeActionCount(isincrement) {
				if(isincrement) {
					this.$store.dispatch('action_increment')
				} else {
					this.$store.dispatch('action_decrement')
				}
			},
			...mapActions({
				plus: 'action_increment',
				minus: 'action_decrement',
				mapAction: 'action_payload'
			}),

			// payload 
			commit() {
				this.$store.commit('commit_payload', {
					payload: 'store commit modidy'
				})
			},
			// 对象提交
			dispatch() {
				this.pro_dispatch = 'delay 1s...';
				this.$store.dispatch({
					type: 'action_payload',
					payload: 'store dispatch modidy'
				}).then(() => {
					this.pro_dispatch = 'dispath';
					console.log('return is a promise.')
				});
			},
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
			aToAlert() {
				alert('href 执行 js 代码.');
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		margin: .1rem;
		a {
			border: solid 1px #007AFF;
			padding: .05rem .1rem;
			border-radius: 8px;
		}
	}
</style>