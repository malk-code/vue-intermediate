// 集中在当前文件内配置好，导出对象，和路由处理类似，这样在 main.js 内注入时直接导入即可

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

/* vuex 状态管理
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
 */

export default new Vuex.Store({
	strict: process.env.NODE_ENV == "production" ? false : true,
	state: {
		count: 0,
		payload: 'Payload',

	},
	mutations: {
		increment(state) {
			state.count++;
			console.log(state.count);
		},
		decrement(state) {
			state.count--;
			console.log(state.count);
		},
		commit_payload(state, obj) {
			state.payload = obj.payload;
		}
	},
	actions: {
		action_increment(context) {
			context.commit('increment');
		},
		// 参数解构
		action_decrement({
			commit
		}) {
			commit('increment');
		},
		action_payload({
			commit
		}, obj) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('commit_payload', obj)
					resolve()
				}, 1000)
			})
		}
	},
	getters: {
		count_info(state) {
			return `count plus ${state.count + 1}`
		}
	}
})