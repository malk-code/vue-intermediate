<template>
	<div class="main">
		<label>
			<VModel 
				:checked="agreed"
				 @changed="agreed = $event" 
				 @get-value="getValue($event)" 
				 style="display: inline;">
			</VModel> 
			{{ agreed }}
		</label>
		<br /><br />
		<!--.native：在一个组件的根元素上直接监听一个原生事件，修饰v-on：当一个组件内同时存在input和button时，未加.stop修饰通过.native直接监听button事件会被调用两次-->
		<VNative :content='content' @keyup.enter.native="getFocus" @click.stop.native="getFocus"></VNative>
		<br />
		<!--2. .native修饰针对的是事件。若存在相同事件标签，可使用$listeners。而且如input标签，若根节点不是input，在组件上通过@focus.native会监听不到，也无报错。按钮事件不会-->
		<VListeners 
			:listener="listener" 
			:tips="tips" 
			@focus.native="getFocus" 
			@input="listener = $event"
			@button-click="getValue($event)">
		</VListeners>
		<br />
		<div style="background: #F9F9F9; padding: 5px 10px;">
			<!--2. 在组件上绑定属性添加.sync修饰符，组件内部写法相同（没有使用 v-model），依然需要绑定value，依然需要抛出value。只是在组件上不需要在实现数据同步，@抛出事件:属性-->
			<!--3. 当props为对象时添加.sync修饰：v-bind.sync同步无效，在组件内手动抛出是必须的。但还需要要在组件上手动同步，sync修饰属性则不需要（注意事件可以存在多个冒号拼接）-->
			<VSync 
				:sync="sync"
				@changed="syncchanged($event)"
				@update:data="syncupdated($event)"
				:syncprop.sync="sync.syncprop"
				@update:syncprop="synclog($event)"
				:syncinfact.sync="sync.syncinfact"
				@update:syncinfact:prop1="synclog($event)"
				@update:prop2="synclog($event)">
			</VSync>
			<hr style="margin: 7px 0px; color: white;" />
			<label>emit: {{ sync.prop }}</label><br />
			<label>update: {{ sync.propsync }}</label><br />
			<label>v-model: {{ sync.propmodel }}</label><br />
			<h4>sync prop: </h4>
			<p>prop.sync: {{ sync.syncprop }}</p>
			<h4>sync obj: </h4>
			<p>
				<label>v-bind.sync: {{ sync.syncinfact.prop1 }}</label><br />
				<label>v-bind.sync: {{ sync.syncinfact.prop2 }}</label>
			</p>
		</div>
		<br />
		<div>
			<VSyncObj 
				:syncinfact.sync="syncinfact"
				@update:prop1="syncobjlog1($event)"
				@update:prop2="syncobjlog2($event)">
			</VSyncObj>
			<p>
				<label>v-bind.sync: {{ syncinfact.prop1 }}</label><br />
				<label>v-bind.sync: {{ syncinfact.prop2 }}</label>
			</p>
		</div>
	</div>
</template>

<script>
	import VModel from '../components/event/v-model.vue';
	import VNative from '../components/event/v-native.vue';
	import VListeners from '../components/event/v-listeners.vue';
	import VSync from '../components/event/v-sync.vue';
	import VSyncObj from '../components/event/v-sync-obj.vue';

	export default {
		data() {
			return {
				agreed: false,
				content: "",
				listener: "",
				tips: "listeners sample: ",
				sync: {
					t1: "emit",
					prop: "",
					t2: "update",
					propsync: "",
					t3: 'v-model',
					propmodel: "",
					
					t4: "sync",
					syncprop: "xx",
					
					syncinfact: {
						t1: "sync1",
						prop1: "xx",
						t2: "sync2",
						prop2: "xxxx"
					}
				},
				syncinfact: {
					t1: "sync1",
					prop1: "obj1",
					t2: "sync2",
					prop2: "obj2"
				}
			}
		},
		components: {
			VModel,
			VNative,
			VListeners,
			VSync,
			VSyncObj,
		},
		methods: {
			getValue(val) {
				window.alert(val)
			},
			getFocus() {
				window.alert("get focus")
			},
			syncchanged(val) {
				this.sync.prop = val;
				console.log(val)
			},
			syncupdated(val) {
				this.sync.propsync = val;
				console.log(val);
			},
			synclog(val) {
				console.log("sync log - " + val);
			},
			syncobjlog1(val) {
				this.syncinfact.prop1 = val;
				console.log("sync obj log1 - " + val);
			},
			syncobjlog2(val) {
				this.syncinfact.prop2 = val;
				console.log("sync obj log2 - " + val);
			}
		},
		mounted() {
			let title = (this.$route.meta.title);
			document.title = title;
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin: .1rem;
	}
</style>