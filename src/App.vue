<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  watch: {
    $route: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="less">
@import url("./assets/css/global.css");
@import url("./assets/css/font/style.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // height: 1200px;
}
</style>
