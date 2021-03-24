<template>
  <div id="blog">
    <Header></Header>
    <!-- 内容 start -->
    <main>
      <div class="left"><router-view /></div>
      <div class="right info">
        <bloger-info></bloger-info>
        <new-article></new-article>
      </div>
    </main>
    <!-- 内容 end -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import Header from "../../components/public/header";
import myFooter from "../../components/public/footer";
import blogerInfo from "../../components/public/blogerInfo.vue";
import newArticle from "../../components/public/newArticle.vue";
export default {
  name: "Public",
  data() {
    return {};
  },
  components: {
    Header,
    myFooter,
    blogerInfo,
    newArticle
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
};
</script>
<style lang="less" scoped>
#blog {
  // max-width: 1320px;
  width: 100%;
  min-width: 960px;
  position: relative;
}
main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
  .right {
    padding: 10px;
  }
}
</style>
