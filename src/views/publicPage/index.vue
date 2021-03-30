<template>
  <div id="blog">
    <Header></Header>
    <!-- 内容 start -->
    <main>
      <keep-alive exclude="Header">
        <div class="left"><router-view /></div>
      </keep-alive>
      <div class="right info">
        <bloger-info></bloger-info>
        <new-article></new-article>
        <tag-list></tag-list>
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
import tagList from "../../components/public/tag_container.vue";
// import categoryList from "../../components/public/category.vue";
export default {
  name: "Public",
  data() {
    return {};
  },
  components: {
    Header,
    myFooter,
    blogerInfo,
    newArticle,
    tagList
    // categoryList
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
  padding: 0 10px;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
  .left {
    flex: 3;
  }
  .right {
    padding-top: 10px;
    flex: 1;
  }
}
</style>
