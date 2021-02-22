<template>
  <div class="home">
    <!-- <navigation></navigation> -->
    <Header></Header>
    <aside>
      <Navigation></Navigation>
    </aside>
    <main><router-view></router-view></main>
  </div>
</template>

<script>
// @ is an alias to /src
// import Navigation from '../components/Navigation.vue'
import Header from '../components/admin/header.vue'
import Navigation from '../components/admin/navigation'
export default {
  components: {
    Header,
    Navigation
  },
  name: 'Home',
  mounted() {
    window.document.body.style.backgroundColor = '#ededed'
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  aside {
    min-width: 220px;
    max-width: 220px;
    height: 100%;
    background-color: #fff;
  }
  main {
    width: 100%;
    margin-top: 60px;
    overflow: auto;
  }
}
</style>
