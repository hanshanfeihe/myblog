<template>
  <div class="header">
    <div class="logo">
      <div class="title">康康博客管理系统</div>
    </div>
    <div class="right userInfo"></div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="less" scoped>
.header {
  position: absolute;
  padding: 0 40px;
  top: 0;
  left: 0;
  line-height: 60px;
  width: 100%;
  background-color: slategray;
}
</style>
