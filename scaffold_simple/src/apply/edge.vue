<template>
	<div class="main">
		<!--48. 处理边界情况：在绝大多数情况下，最好不要触达另一个组件实例内部或手动操作 DOM 元素。-->
		<h4>处理边界情况:</h4>
		<br />
		<edgecase
			:prop="prop"
			:obj="obj"
			@input-changed='obj.val = $event'
			:sync.sync="sync">
		</edgecase>
		
		<br />
		<a href="http://192.168.2.101:8080/#/edge-comp">边界组件：如递归组件，内联模板 见 edge-comp.vue: </a> 
	</div>
</template>

<script>
	import edgecase from '../components/edge/v-edge.vue';
	
	export default {
		data() {
			return {
				prop: 'this is a prop.',
				obj: {
					val: "",
					place: "处理边界情况",
				},
				sync: "",
				roots: 'this is a prop from comp vue.'
			}
		},
		methods: {
			showroot() {
				window.alert('I\'m comp vue root node.');
			},
			
			getprovide() {
				return 'this is provide.';
			},
			getinject() {
				return 'this is inject.';
			}
		},
		mounted() {
			console.log('comp vue - ');
			console.log(this.$root.$children[0].roots);
			// 访问路由标题
			let title = (this.$route.meta.title);
			document.title = title;
		},
		components: {
			edgecase,
		},
		// 依赖注入：值得学习的点
		provide() {
			return {
				getprovide: this.getprovide,
				getinject: this.getinject,
			}
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin: .1rem;
	}
</style>