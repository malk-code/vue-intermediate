1. init 下的 eslint  -- 设置 no
	严格模式：页面不能有无用空格；不能有定义未使用的变量；代码注释需要符合规范 ...
	新建项目建议将 test 和 e2e 都设置为 no，避免 node_modules 过大。（若需要删除 modules，在 package.josn 删除后，删除 node_modules 重新 npm install 即可）
	
2.本地服务器：建议将 autoOpenBrowser 设置为 true
	1. simple 没有带有 webpack-dev-server模块，但 init 有；执行 npm install --save-dev webpack-dev-server 是更新
	2. 区别于 simple，在 init 仅仅需要修改在 config 下的 index.js 中 dev.host 为当前 ip 地址即可，支持热更新；提供 npm run dev 指令运行
	
3. 项目打包
	打包
		init 会新建一个 build.js 打包文件，在终端输入 npm run build 指令就是 package.json 内配置的 script 下的指令，指向去执行 build.js 配置的打包流程。
		init 下打包依赖于 HtmlWebpackPlugin，会在 dist 文件夹下生产一个 index.html 入口文件，且会新建一个 static 文件夹放 js，css，image 文件夹。-- 甚至可以配置公共 js 文件出口
	配置
		在调试模式下，vue 会自动将 build.js 写入运行内存中。init 下是自动注入的，因此仅需要修改在 config 下的 index.js 中 build.assetsPublicPath 为 ./ 即可，相对路径。
		路径：/ 代表根目录下，./ 表示当前目录下，../ 代表的是上层目录下：本地服务器时，注意 ./ 和 / 的使用，因为本地服务器项目是启动在根目录下，这时 ./ 和 / 使用是一致。
	
4. 路由管理
	1. init 路由引入页面，支持 @ 替换 src：在 simple 是 ../apply/index.vue，在 intact 是 @/apps/index。 -- 两个构建方式引入的基础 modules 不一致，init 下 .bebelrc 默认配置了模块动态加载。
	2. 创建项目时选择创建路由，注意配置路由的名字不能重复。init 下直接支持 import() 导入模块，require 等同于 simple 默认是支持的。-- 绑定本地图片提供require导入，当做模块。
    3. 路由信息
        1. $route 访问路由配置信息：如设置页面标题，mounted() { document.title = his.$route.meta.title;  }，$route 可访问到当前页面在路由中配置信息，和 params 和 query 传参
        2. 页面切换：除 location 和 window.open 外，配置了路由可通过 $router 切换路由 $router：this.$router.push({ 	});  在对象内可以指定在 router 内配置的 name 或 path 即可。
        3. $router 切换路由页面，router 对象配置 name 或 path 都行，如果同时指定，则以第一个为准。还可添加 params 和 query 传参，params 页面刷新数据消失。通过 $route 访问
        4. ${ }：需要使用折反单引号，不是引号，${}里边依旧是js，外边也是js ，场景如字符串拼接，只要console.log(`== ${a} ==`)：这和 C# 打印的 $ 用法极相似。还可以用作路由传参
        5. 声明：路由的 query 和 params 传参，query 传递对象刷新页面模型数据会丢失，集合数据不会；且还需要声明是在  router 的 push 传递必是必须为 name，不能是 path
    4. 路由的钩子函数，设置页面标题为路由内配置的 meta.title，在main.js 内导入路由对象并设置钩子函数，导航栏 title 可绑定 $route.meta.title，统一管理
		router.afterEach((to, from, next) => {
			document.title = to.meta.title;
		});
	5.模块管理 webpack ensure
	    1. 有人称它为异步加载，也有人说做代码切割，它把js模块给独立导出一个.js文件，然后使用这个模块的时候，webpack会构造script dom元素，由浏览器发起异步请求这个js文件。
	    2. const xx = r => require.ensure([], () => r(require('../xx')), ‘打包文件的名称’);  这个指定的路由页面在打包时会在 dist 下新增一个指定文件名称为指定的名称：dist 是可以修改的。

5. 样式重置
	设置 app.vue 下 style  标签 lang='less'，注意不要设置 scoped，并且要引入 @import '~vux/src/styles/reset.less'; 覆盖浏览器默认样式：无所谓是否引入 vux 库
	
6. node_modules
	1. 若项目不能新增依赖，尝试删掉依赖包，重新npm install
	2. 若需要删除 modules，在 package.josn 删除后，删除 node_modules 重新 npm install 即可 

7. 引入 mnit-ui
	在 Mac 下查看隐藏文件组合键 command + shift + . 即可显示隐藏的 .bebelrc，注意添加的 component 是一个集合：避免样式文件需要单独引入。
	.bebelrc 默认配置了模块动态加载，simple 下需要手动配置路由，若想使用 import() 异步懒加载，还需要配置 babel 的 syntax-dynamic-import 插件
	
	链接：https://mint-ui.github.io/docs/#/en2/quickstart  -- mint-ui 和 vux 使用稍有不同，vux 符合 vue 习惯，还新增了插件引用方式，mint-ui 使用是全局注册，部分全屏组件还不是单例组件
	安装 ui 库 npm i mint-ui -S  配置按需加载 npm install babel-plugin-component -D 在项目文件夹下找到 .bebelrc 隐藏文件，在 plugin 集合中添加
	[["component", [
	    	{
	      "libraryName": "mint-ui",
	      "style": true
	    }
  	]]
	
8. vuex 状态管理
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
        
9. img 标签无法点击问题，在 iOS 端，可能需要将图片的 cursor 设置为 pointer —  cursor: pointer;  -- 在 App.vue 内设置 img（App.vue 样式的不为 scoped）。

10. rem 计算
	1. 在 src 下新建 ntils 文件夹，再在 static 内新建 layout 文件夹，导入计算 rem 的 rem.js 文件，之后在 main.js 内导入并使用 import Rem from './utils/layout/rem.js'; Rem.rem();
	2. 引用淘宝初始化 css 代码
		1. 在 src 下新建 static 文件夹，再在 static 内新建 css 文件夹，导入淘宝的 style.css 文件；simple 在 App.vue 直接设置 body 的 font-size 为 xxpx 即可
		2. 在 App.vue 内引用淘宝的 css 样式，@import "./static/css/style.css"; （App.vue 内 style 使用 lang 为 less，不使用 scoped）。

11. 图片路径 imgPath 有二种写法：
    1. 如果图片是在 assets 文件夹下面的话，需要在路径前面加上 require 函数才行，否则 webpack 会识别不了路径报错: require("../../assets/xxxx.xxx")
    2. 还可以把图片放到 static 文件夹下面，这样的话就不需要 require ，可以像原来传统的方式那样写 : "../../../static/logo.png"
    3. 案例：公共导航栏组件，考虑到右侧按钮基本都是图片和事件不同，因此考虑使用第二种方案（第一种方案需要结合路由使用），把图片相对路径传入即可，将事件抛出
    4. 备注：在 static 目录下的文件并不会被 Webpack 处理：它们会直接被复制到最终目录（默认是dist/static）下。必须使用绝对路径引用这些文件：process.env.NODE_ENV === 'production' ? "./static/img/share.png" : "../../static/img/share.png",
    

	

	
	
