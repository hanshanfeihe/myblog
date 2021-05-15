<template>
  <div class="index">
    <div class="fixed">
      //文章分类
      <div class="category">
        <category-list @selectedIndex="getIndex" />
      </div>
    </div>
    <div class="left content">
      <blog-item
        v-for="item in articleList"
        :key="item.id"
        :item="item"
      ></blog-item>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="4"
        :current-page="page"
        @current-change="handleCurrentChange"
        v-if="total > 2"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import blogItem from "../my-blogItem/index.vue";
import categoryList from "../public/category.vue";
export default {
  name: "Index",
  data() {
    return {
      articleList: [],
      total: 0,
      showInfo: [
        "喜欢香港电影，喜欢粤语歌曲",
        "目前大四,正在找工作中",
        "技能：HTML,CSS,JS,Vue等......"
      ],
      number: 0,
      isFixed: false,
      scrollY: 0,
      sort_id: null,
      sort_name: null,
      page: 1,
      sortList: []
    };
  },
  watch: {
    scrollY() {
      if (this.scrollY > 210) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    sort_id() {},
    $route() {
      this.toTop();
    }
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.showInfo[this.number]
      };
    }
  },
  components: {
    blogItem,
    categoryList
  },
  methods: {
    startMove() {
      setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 1000);
    },
    async getAllArticle() {
      const { data: res } = await this.http.get("article/getarticle", {
        params: {
          count: 4,
          page: 1
        }
      });
      this.articleList = JSON.parse(res.data);
      const { data: res2 } = await this.http.get("article/getarticle");
      this.total = JSON.parse(res2.data).length;
      console.log(this.total);
    },
    async handleCurrentChange(index) {
      this.page = index;
      const { data: res } = await this.http.get("article/getarticle", {
        params: {
          count: 4,
          page: this.page
        }
      });
      this.articleList = JSON.parse(res.data);
    },
    getIndex(id) {
      console.log(id);
      this.sort_id = id;
      this.page = 0;
      window.sessionStorage.setItem("sort_id", id);
      if (id) {
        this.getSortArticle(id);
      } else {
        this.getAllArticle();
      }
    },
    async getSortArticle(id) {
      // console.log(id);
      const { data: res } = await this.http.get("article/getsortarticle", {
        params: {
          sort_id: id,
          count: 4,
          page: 1
        }
      });
      this.articleList = res.data.rows;
      this.total = res.data.count;
      console.log(res.data.count);
      console.log(res.data.rows);
    },
    toTop() {
      clearInterval(time1);
      // window.scroll(0, 0)
      // console.log(document.documentElement)
      // document.documentElement.scrollTop = 0
      let time1 = setInterval(() => {
        let y = document.documentElement.scrollTop;
        // console.log(y)
        if (y > 0) {
          document.documentElement.scrollTop = y - 50;
        } else {
          clearInterval(time1);
        }
      }, 10);
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollY = window.scrollY;
      // console.log(this.scrollY)
    });
    // console.log(this.$route.params);\
    if (window.sessionStorage.getItem("sort_id")) {
      this.page = 1;
      if (window.sessionStorage.getItem("sort_id") !== "null") {
        console.log("获取分类文章");
        this.getSortArticle(window.sessionStorage.getItem("sort_id"));
      } else {
        this.getAllArticle();
      }
    } else {
      console.log("获取所有文章");
      this.getAllArticle();
    }
  },
  async created() {
    const { data: res2 } = await this.http.get("sort/getsortlists");
    // console.log(res)
    console.log(JSON.parse(res2.data));
    // console.log(JSON.stringify(res.data))
    this.sortList = JSON.parse(res2.data);
    // console.log(typeof this.articleList)
    // console.log(this.articleList)
    this.startMove();
    if (!window.sessionStorage.getItem("index")) {
      this.getAllArticle();
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  height: 100%;
  padding: 10px;
  display: flex;
  // align-items: flex-start;
  .fixed {
    position: relative;
    flex: 1;
    // background: #fff;
    display: flex;
    justify-content: center;
    .category {
      flex: 1;
      min-width: 150px;
      position: fixed;
      margin: 10px;
      margin-top: 0;
      background: #fff;
    }
  }

  .left {
    .header {
      background: #fff;
      padding: 20px 20px 0 20px;
      border-bottom: 1px dashed #60c30d;
    }
    flex: 4;
    min-height: calc(100% - 60px);
  }
}
</style>
