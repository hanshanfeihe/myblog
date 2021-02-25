<template>
  <div id="blog">
    <Header></Header>
    <!-- 内容 start -->
    <main><router-view /></main>
    <!-- 内容 end -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import Header from '../../components/public/header'
import myFooter from '../../components/public/footer'
export default {
  name: 'Public',
  data() {
    return {}
  },
  components: {
    Header,
    myFooter
  },
  watch: {
    // $route() {
    //   console.log(this.$route.path)
    // }
  },
  mounted() {
    // console.log(this.$route.path)
  },
  created() {
    // console.log(this.$route.path)
  }
}
</script>
<style lang="less" scoped>
#blog {
  // max-width: 1320px;
  width: 100%;
  min-width: 960px;
  position: relative;
}
main {
  width: 100%;
  height: 100%;
  // padding-top: 210px;
  // padding: 20px 20px;
  // background-repeat: no-repeat;
  // background-size: 100%;
  // background-position: center center;
  min-height: 100vh;
}
</style>
