
/* 2. 页面间使用Bus
    1. 注意使用后清空，避免重复调用。— $once 能确保仅仅会被调用一次，优于 $on（$off 其实可在组件B的beforeDestory内调用，也可以在$on/$once内调用）
    2. 尤其需要注意，组件A $emit事件应在beforeDestory生命周期内：避免出现第一次监听不到；下次点击监听两次的情况（已处理 $off ）— 监听两次可使用 $once 避免
    3. 备注
        1. 使用 Bus 在修改 location 做页面跳转时，需要使用相对路径，本地服务器项目是启动在根目录下，这时 ./ 和 / 效果相同。
        2. 若跳转未加 index.html，则访问的上级页面也不能含有 index.html，否则会导致传参失败（配置路由下 index.html 是可省略的）：建议使用路由做跳转。
*/
import Vue from 'vue';

export default new Vue;
