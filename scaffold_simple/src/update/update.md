1. .sync 绑定 obj - Vue 的 Bug
2. 错误：scrip 模板的代码会走两次，这意味着在 export default 外的代码会被执行两次。经检查，在 simple / init 下配置 vux 都存在这个问题。-- export default 内一次，若做了懒加载，控件会被缓存，我认为性能影响有限吧 -- 和全局混入的情况不一样
