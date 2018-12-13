<template>
  <div class="main">
    <h1>嵌套路由</h1>
    <ul>
      <li>
        <router-link to="/nested-router/second">二级路由</router-link>
      </li>
      <li>
        <router-link to="/nested-router/nested">命名路由</router-link>
      </li>
    </ul>
    <section class="nested">
      <router-view></router-view>
      <router-view name="nested"></router-view>
      <router-view name="named"></router-view>
      <router-view name="views"></router-view>
    </section>
    <div>
      <h3>备注：</h3>
      <ul>
        <li>
          <p>命名路由其实和二级路由基本一致，其实也属于二级路由，都是路由的嵌套。二级路由仅仅是把router-view之外的页面当成了固定的</p>
        </li>
        <li>
          <p>如果把router-view理解为slot，那命名路由就是命名插槽。只是命名路由通过router-view的name来控制父组件的router-view显示。slot通过组件的slot这个属性</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.main {
  padding: 10px;
  .nested {
    border: 1px dotted rebeccapurple;
    margin: 15px;
    padding: 10px;
  }
}
</style>
