<template>
  <div id="app">
    <img class="logo" src="../assets/img/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
		<p class="description" v-text="description"></p>
		<p class="description, remark" v-text="remark"></p>
		
		<button class="remark" @click="links">To index</button>
  </div>
</template>

<script>
export default {
	inject: ['headerState'],
  data () {
    return {
      msg: 'Welcome to My Vue.js App',
      description: "Hello, it's my local server.",
      remark: "MU"
    }
  },
	methods: {
		links: function() {
			// 路由传参
			// 5. 声明：路由的 query 和 params 传参，query 传递对象刷新页面模型数据会丢失，集合数据不会；且还需要声明是在  router 的 push 传递必是必须为 name，不能是 path
			this.$router.push({
				name: 'index',
				query: {
						name: 'query',
						obj: {
								xx: 'xx',
								xxx: 'xxx'
						}
					},
					params: {
						name: 'params'
					}
			});
		},
	},
	mounted() {
		let title = (this.$route.meta.title);
		document.title = title;
		// 依赖注入隐藏返回按键
		this.headerState({ hasheader: true, iscanback: false });
	}
}
</script>

<style scoped="scoped">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 13px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.description {
	text-align: center;
	margin-top: 5%;
}
.remark {
	margin-top: 10%;
}
</style>
