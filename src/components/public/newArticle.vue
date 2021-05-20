<template>
  <div class="new-article">
    <div class="container">
      <div class="header">
        近期文章
      </div>
      <div class="articles">
        <div class="artile-item" v-for="item in newArticleList" :key="item.id">
          <div class="title" @click="toArticle(item.id)">{{ item.title }}</div>
          <div class="date">{{ item.create_time | getPublishDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newArticle",
  data() {
    return {
      newArticleList: [] //最新新文章列表
    };
  },
  methods: {
    //获取新文章
    async getNewArticleList() {
      const { data: res } = await this.http.get("article/getnewarticle");
      // console.log(res.data);
      this.newArticleList = JSON.parse(res.data);
    },
    toArticle(id) {
      console.log(id);
      this.$router.push("/article/" + id);
    }
  },
  computed: {},
  filters: {
    getPublishDate(item) {
      return item.substr(0, 10);
    }
  },
  created() {
    this.getNewArticleList();
  }
};
</script>
<style lang="less" scoped>
.new-article {
  min-width: 250px;
  margin-top: 10px;
  background: #fff;
  .container {
    .header {
      padding: 10px 15px;
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
    }
    // background-color: #fff;
  }
  .articles {
    .artile-item {
      padding: 10px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .title {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover {
          color: skyblue;
        }
      }
    }
  }
}
</style>
