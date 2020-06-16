<template>
  <div class="main">
    <h2>这里是命名路由主页面</h2>
    <h4>Nested Named Views：命名路由</h4>
    <p>其实这里属于二级路由，命名路由的配置在router.js和当前页面的父组件（容器）内进行配置</p>
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
  border: 1px dotted rebeccapurple;
  margin: 15px;
  padding: 10px;
}
</style>
