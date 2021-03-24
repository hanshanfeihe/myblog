<template>
  <div class="index">
    <div class="left content">
      <blog-item
        v-for="item in articleList"
        :key="item.id"
        :item="item"
      ></blog-item>
    </div>
  </div>
</template>
<script>
import blogItem from "../my-blogItem/index.vue";
export default {
  name: "Index",
  data() {
    return {
      articleList: [],
      showInfo: [
        "喜欢香港电影，喜欢粤语歌曲",
        "目前大四,正在找工作中",
        "技能：HTML,CSS,JS,Vue等......"
      ],
      number: 0,
      isFixed: false,
      scrollY: 0,
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
    blogItem
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
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollY = window.scrollY;
      // console.log(this.scrollY)
    });
  },
  async created() {
    const { data: res } = await this.http.get(
      "http://127.0.0.1:3000/article/getarticle"
    );
    const { data: res2 } = await this.http.get(
      "http://127.0.0.1:3000/sort/getsortlists"
    );
    // console.log(res)
    console.log(JSON.parse(res2.data));
    // console.log(JSON.stringify(res.data))
    this.articleList = JSON.parse(res.data);
    this.sortList = JSON.parse(res2.data);
    // console.log(typeof this.articleList)
    // console.log(this.articleList)
    this.startMove();
  }
};
</script>
<style lang="less" scoped>
.index {
  padding: 10px;
}
</style>
