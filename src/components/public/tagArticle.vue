<template>
  <div id="tag-article">
    <div class="header">
      <p>
        <span class="label-name">"{{ name }}"</span>
        标签下的文章
      </p>
    </div>
    <div class="content">
      <div class="havecontent" v-if="count !== 0">
        <blog-item
          v-for="item in articleList"
          :key="item.id"
          :item="item"
        ></blog-item>
      </div>
      <div class="nocontent" v-else>
        <div class="null">
          <p>暂无数据</p>
          <img src="../../assets/null.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import blogItem from "../my-blogItem/index.vue";
export default {
  name: "tagArticle",
  data() {
    return {
      articleList: [],
      count: 0
    };
  },
  components: {
    blogItem
  },
  props: ["name"],
  methods: {
    async getTagArticle() {
      console.log(this.name);
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/gettagarticle",
        {
          params: {
            tag_name: this.name
          }
        }
      );
      console.log(res);
      this.articleList = res.data.rows;
      this.count = res.data.count;
    }
  },
  watch: {
    name() {
      this.getTagArticle();
    }
  },
  created() {
    console.log(this.name);
    this.getTagArticle();
  }
};
</script>
<style lang="less" scoped>
#tag-article {
  background: #fff;
  height: 100%;
  padding: 20px;
  margin: 10px;
  .header {
    padding-left: 20px;
    line-height: 30px;
    .label-name {
      color: seagreen;
      letter-spacing: 5px;
      font-size: 18px;
    }
    border-bottom: 1px solid seagreen;
  }
  .content {
    height: 100%;
  }
  .nocontent {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
    }
    img {
      width: 250px;
      height: 250px;
    }
  }
}
</style>
