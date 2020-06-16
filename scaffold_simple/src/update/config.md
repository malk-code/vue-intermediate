1.本地服务器
	1. 在 webpack.config.js 的 devServer 新增
        inline: true, //实时刷新
	    host: "192.168.2.101", //本机的局域网ip
	    open: true //是否运行成功后直接打开页面 -- 指令优先级更高：webpack-dev-server --open
	2. 在 package.json 内新增 -- dev-server 没有热更新
		"scripts": {
		    "server": "webpack-dev-server --open",
		    "dev-server": "webpack-dev-server --hot --inline",
	 },
	备注：不要删除 "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"，这会导致 npm run build 失败。-- init 会新建一个 build.js 打包

2. 引入less库  npm install less less-loader --save 
	--save 在 package.json 中引用在 dependencies；-save-dev 在 package.json 中引用在 devDependencies -- 目前 login 页面使用到

3. 样式重置
	设置 app.vue 下 style  标签 lang='less'，注意不要设置 scoped，并且要引入 @import '~vux/src/styles/reset.less'; 覆盖浏览器默认样式：无所谓是否引入 vux 库

4. 路由配置
	1. 在 npm install 完成后，执行 cnpm install vue-router vue-resource --save，安装 vue 路由模块vue-router和网络请求模块vue-resource
	2. 在 src 下新建 router 文件夹，新建一个 index.js 文件来处理路由。懒加载可用 require 和 import() 方案，首页可用声明式加载，切记不要对同一个组件使用两种加载方式
	3. 使用路由需要：1. 导入依赖和使用路由，再导出配置的路由对象；2. 在 main.js 内引用新增的路由文件给 App；3. 将App.vue 作为路由切换站点。配置 router-view 标签
	4. 路由信息
        1. $route 访问路由配置信息：如设置页面标题，mounted() { document.title = his.$route.meta.title;  }，$route 可访问到当前页面在路由中配置信息，和 params 和 query 传参
        2. 页面切换：除 location 和 window.open 外，配置了路由可通过 $router 切换路由 $router：this.$router.push({ 	});  在对象内可以指定在 router 内配置的 name 或 path 即可。
        3. $router 切换路由页面，router 对象配置 name 或 path 都行，如果同时指定，则以第一个为准。还可添加 params 和 query 传参，params 页面刷新数据消失。通过 $route 访问
        4. ${ }：需要使用折反单引号，不是引号，${}里边依旧是js，外边也是js ，场景如字符串拼接，只要console.log(`== ${a} ==`)：这和 C# 打印的 $ 用法极相似。还可以用作路由传参
        5. 声明：路由的 query 和 params 传参，query 传递对象刷新页面模型数据会丢失，集合数据不会；且还需要声明是在  router 的 push 传递必是必须为 name，不能是 path
    5. 路由的钩子函数，设置页面标题为路由内配置的 meta.title，在main.js 内导入路由对象并设置钩子函数，导航栏 title 可绑定 $route.meta.title，统一管理
		router.afterEach((to, from, next) => {
			document.title = to.meta.title;
		});
	6.模块管理 webpack ensure
	    1. 有人称它为异步加载，也有人说做代码切割，它把js模块给独立导出一个.js文件，然后使用这个模块的时候，webpack会构造script dom元素，由浏览器发起异步请求这个js文件。
	    2. const xx = r => require.ensure([], () => r(require('../xx')), ‘打包文件的名称’);  这个指定的路由页面在打包时会在 dist 下新增一个指定文件名称为指定的名称：dist 是可以修改的。
	7.二级路由
		

5. npm install vue-pikaday
	程序化事件监听器：http://192.168.2.101:8080/#/edge
	引用 pikaday 组件，虽然引用未加 --save 或者 -save-dev，但依赖依然会进入到 dependencies，可能默认就是 --save，进入  package.json 依赖后，重新下载会同步的
	
6. 模块管理
	import 是模板编译指令，会提升到文件顶部执行，且是编译期运行。若 import 不是导入 export default，则需要使用花括号包含引入变量，可用 as 为引入变量取别名。
	import() 是运行时异步加载，返回一个promise，require 也是运行时加载，但是同步加载。她俩都是懒加载，是异步组件的基础，也是配置懒加载路由的方式，require默认可使用
	
	import() 配置：配合 babel 的 syntax-dynamic-import 插件
	1. npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015  -- 若项目不能新增依赖，删掉依赖包，重新npm install
	2. 在 webpack.config.js 的 'babel-loader' 同级新增
        	options: {
          	presets: [['es2015', {modules: false}]],
          	plugins: ['syntax-dynamic-import']
	     }
	配置成功才能启动服务器 npm run server，在路由中返回 component：() => import('')；在组件内使用需要添加 System 前缀 () => System.import('')
	
	require 使用：https://www.cnblogs.com/zhanyishu/p/6587571.html
	1. require 默认可使用，且和 import() 并不冲突，在 router 内配置了 import require import() 格式路由，均得到支持正常加载。
	2. require 加载异步组件，建议局部注册，最简写法是在 components 新增一个 key 接受 resolve => require([''], resolve)，避免使用全局注册。
	
	备注：使用详见 scaffold_simple 项目的 http://192.168.2.101:8080/#/comp 页面和路由配置；import() 在组件内部使用和 require 一致，只是在组价内需要添加 System 前缀
	
7. 项目打包
	打包：在 package.json 配置 script 添加本地服务器时，不要删除 "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"。 -- init 会新建一个 build.js 打包
	备注：在终端输入是指令就是 package.json 内配置的 script 下的指令：如打包在 simple 下就是执行 build 指令，在 init 配置下就会配置指向去执行 build.js 配置的打包流程。
	
	simple 和 init：
		1. init 下打包依赖于 HtmlWebpackPlugin，会在 dist 文件夹下生产一个 index.html 入口文件，且会新建一个 static 文件夹放 js，css，image 文件夹。-- 甚至可以配置公共 js 文件出口
		2. simple 下不会生成 build 文件夹，所有的 webpack 配置信息都在 package.config.js 内，且执行打包指令仅仅会在 dist 文件夹生成js，并且是一级目录。-- js 文件多是因为使用了按需加载
	
 	菜鸟&坑爹：
	在调试模式下，vue 会自动将 build.js 写入运行内存中。simple 的 webpack.config.js 和 init 下的 build 基本等效，只是是简版。生产将 dist 文件放到服务器，直接引用 index.html 即可。
	无论是 simple 还是 init，在 build 的时候都要将 webpack 基础配置信息中 output 的 publicPath 设置为相对路径（./），否则就是请求服务器根目录下的 dist/build.js 文件了。
	
	针对 simple：
		未配置 HtmlWebpackPlugin 插件。关于titile，HtmlWebpackPlugin 可用于设置页面 title，因此若要同步路由配置的标题，则 mounted() { document.title = this.$route.meta.title; }
		simple 打包不会自动生 index.html 文件，在 init 下 js 都是自动注入的。在 simple 下需要通过 scrip 标签显式地引用 build.js 文件，在调试模式下，vue 会自动将 build.js 写入运行内存中。
		手动配置入口文件，拷贝一份 index.html 文件做生产发布用，修改引用的 build.js 文件路径。如将生产的 index.html 文件放入 dist 内，则需要将 src="/dist/build.js" 修改为 src="./build.js" 相对路径引用
 		simple 下模仿 init 的配置方式，设置 output 下的 publicPath: process.env.NODE_ENV === 'production' ? './' : '/dist/' (process.env 是读取系统环境变量的)：区分生产和测试下 js 文件引用路径

8. 引入 vux
	1. npm install vux --save 和 npm install vux-loader --save-dev  
	2. npm install less less-loader --save-dev （项目配置第2步已经安装）和 npm install yaml-loader --save-dev (测试发现不安装也能正常运行)
	3. 修改 webpack.config.js 配置来引用vux：讲原来的 module.exports 代码赋值给变量 webpackConfig，即将原来的module.exports 改为 const webpackConfig；在文件后面赋值 webpackConfig
		const vuxLoader = require('vux-loader')
		module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
	
	4. vux 官方文档建议配置
		1.vux 可选配置2：module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
		module.exports = vuxLoader.merge(webpackConfig, { plugins: [{name:'vux-ui'}, {name: 'duplicate-style'}] })
		
		2.vux 可选配置1，添加 Fastclick 移除移动端点击延迟
		const FastClick = require('fastclick')
		FastClick.attach(document.body)
		说明：可配置在 main.js 或 App.vue（若配置在 App.vue 内，需要配置了路由 App.vue 作为中转，此时 App.vue 仅仅会被调用一次）：建议配置在 main.js 内，因为 vux 下模板的 scrip 代码会走两次
		
		3.vux 可选配置3：引入 reset.less，默认样式不包含reset，并且部分用户自己有一套reset样式，因此需要在App.vue进行手动引入
		@import '~vux/src/styles/reset.less';
		
	备注：
		参考 https://blog.csdn.net/milli236/article/details/78318768 链接；官方文档 https://doc.vux.li/zh-CN/install/manual-usage.html
		 vux 使用和 vue 极像，注册可用局部，全局方式引用，还新增了插件引用方式； mint-ui 和 vux 使用稍有不同， 组件使用是全局注册，部分全屏组件还不是单例组件。
	
	更多：
		1. 主题：配置vux-loader的less-theme插件，指定用以覆盖的less文件路径：vux 配置在 webpack.config.js 导出的 module 内：https://doc.vux.li/zh-CN/development/theme.html
		2. vue 全局公用函数：如果需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上。注册在 main.js 内 Vue.prototype.$method = function () {}；挂载到 prototype 上是为了方便组件内直接用 this.$method 来使用
	    3. autoprefix 推荐配置：https://doc.vux.li/zh-CN/development/vue-loader-autoprefix.html
            1. 建议同WeUI一样，使用配置 ['iOS >= 7', 'Android >= 4.1’]：可配置在 package.json 内 或直接在 vux-loader 里配置，直接在配置 vux-loader 的 duplicate-style 插件内。
            
    错误：scrip 模板的代码会走两次，这意味着在 export default 外的代码会被执行两次。经检查，在 simple / init 下配置 vux 都存在这个问题。-- export default 内一次，若做了懒加载，控件会被缓存，我认为性能影响有限吧

9. init 下的 eslint -- 建议设置 no
	严格模式：页面不能有无用空格；不能有定义未使用的变量；代码注释需要符合规范 ...
	
10. node_modules
	1. 若项目不能新增依赖，尝试删掉依赖包，重新npm install
	2. 若需要删除 modules，在 package.josn 删除后，删除 node_modules 重新 npm install 即可
	
11. vuex 状态管理
    1. 简介：
        1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
        2. 不能直接改变 store 中的状态：改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。而非直接修改 state，因为这可以更明确地追踪到状态的变化。
    2. state：
        1. 状态管理，定义状态管理属性。强烈建议不要直接修改 state 的属性，这会导致难以监管，从面相对象来说，这破坏了封装性
        2. Vuex.Store 本质是实现的一个单例，web 的门槛低可能这是一个原因，监管一个简单的对象变更很繁琐，虽然有对象，却没有面向对象的思想（setter/getter）
    3. mutation：
        1. Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)；mutation 一个重要的原则就是 mutation 必须是同步函数。
        2. 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）。在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读。
        3. 对象风格提交：将 mutation 的名称包裹在对象的 type 属性上，此时，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：实现没有改变，调用方式改变。
    4. action：
        1. Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作，批量处理 mutation，还可以返回一个 promise，Action 通过 store.dispatch 方法触发
        2. 因为 mutation 都是同步事务， 更建议使用异步的 actions 来处理 commit 操作，对 mutation 进行封装。和 mutation 一样，Actions 支持同样的载荷方式和对象方式进行分发
    5. getters：
        1. 对 state 的 computed，从 store 中的 state 中派生出一些状态，如 computed，getter 的返回值会根据它的依赖被缓存起来。Getter 也可以接受其他 getter 作为第二个参数。
        2. 也可以通过让 getter 返回一个函数，来实现给 getter 传参。这对 store 里的数组进行查询时非常有用。注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
    6. map 映射：
        1. 将 store 内定义的 state，getters，actions，映射到当前组件下，需要从 vuex 导入 mapState，mapGetters，mapActions。导入对象可为字典或集合：字典可重命名属性名称。
        2. 这将不再需要频繁的访问 $store，将 mutation 封装在 actions 内，也不需要直接 commit 触发 mutation，通过 mapActions 也不需要显式地调用 dispatch 分发，就像调用方法。
        3. mapState：使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。属于单个组件的状态，最好还是作为组件的局部状态。...mapState 将 store 内的状态映射到当前组件。
        4. mapGetters：Vuex 允许在 store 中定义“getter”（可以认为是 store 的计算属性）。...mapGetters 建议映射在 computed 内：正常是通过 $store.getters 进行 getter 访问。
        5. mapAction：通过 ...mapActions 在 methods 内映射 store 的 actions，映射完成可直接进行调用，避开了显式地访问 $store 来调用 commit 或 dispatch，更建议使用 actions。
    7. 配置：
        1. 依赖：npm install vuex --save
        2. 集中在 store 内配置好，导出 store 对象，和路由处理类似，这样在 main.js 内注入时直接导入即可
        3. import 导入模块，如路由，组件，状态。若文件夹子下存在 index 文件，默认会识别并导入，且在导入文件的时候，编译会主动识别文件类型，即导入还可省略文件后缀。
    8. strict
        1. 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
        2. 注意：**不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。	
        3. 当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会比较棘手：处理起来较为繁琐：建议可不使用 strict，使用注意需要直接修改 state 就行。

12. img 标签无法点击问题，在 iOS 端，可能需要将图片的 cursor 设置为 pointer —  cursor: pointer;  -- 在 App.vue 内设置 img（App.vue 样式的不为 scoped）。

13. rem 计算
	1. 在 src 下新建 ntils 文件夹，再在 static 内新建 layout 文件夹，导入计算 rem 的 rem.js 文件，之后在 main.js 内导入并使用 import Rem from './utils/layout/rem.js'; Rem.rem();
	2. simple 在 App.vue 直接设置 body 的 font-size 为 xxpx 即可，App.vue 内 style 使用 lang 为 less，不使用 scoped；intact 使用淘宝案例。
	

	

	
	
