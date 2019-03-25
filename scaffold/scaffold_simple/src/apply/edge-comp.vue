<template>
  <div class="main">
    <h4>边界组件：</h4>
    <edgerecursion></edgerecursion>
    <br />
    <edgecircle></edgecircle>
    <br />
    <edgeinline></edgeinline>
    <br />
    <edgeonce></edgeonce>
  </div>
</template>

<script>
export default {
  components: {
    edgecircle: () => System.import('../components/edge/v-edge-circle.vue'),
    edgerecursion: () => System.import('../components/edge/v-edge-recursion.vue'),
    edgeinline: () => System.import('../components/edge/v-edge-inline.vue'),
    edgeonce: () => System.import('../components/edge/v-edge-once.vue'),
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
}
</script>

<style scoped="scoped">
.main {
  margin: 0.1rem;
}
</style>
