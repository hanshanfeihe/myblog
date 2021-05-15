<template>
  <div class="container">
    <div class="left category">
      <blog-item
        :item="item"
        v-for="item in articleInfo"
        :key="item.id"
      ></blog-item>
    </div>
    <div class="right blog-lists">分类列表</div>
    <!-- <div class="content" v-html="content"></div> -->
  </div>
</template>
<script>
import blogItem from "./my-blogItem/index.vue";
export default {
  name: "Index",
  data() {
    return {
      articleInfo: [],
      content: ""
    };
  },
  components: {
    blogItem
  },
  async created() {
    const { data: res } = await this.http.get(
      "article/getarticle"
    );
    console.log(res);
    this.articleInfo = res.data;
    this.articleInfo = JSON.parse(this.articleInfo);
    console.log(this.articleInfo);
    // this.content = this.articleInfo[0].content
  }
};
</script>
<style lang="less" scoped>
.container {
  // width: 950px;
  display: flex;
  width: 100%;
  margin: 0 auto;
  // background-color: #fff;
  padding: 0 20px;
  justify-content: center;
  .left {
    flex: 4;
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    margin-right: 15px;
  }
  .right {
    flex: 1;
    margin-top: 20px;
    // height: 300px;
    background-color: #fff;
  }
}
</style>
