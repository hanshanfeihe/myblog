<template>
  <div id="archive">
    <div class="header">
      文章归档
    </div>
    <div class="timeline">
      <div class="time" v-for="(item, index) in dateList" :key="item.date">
        <div class="date">{{ item.date | getDate }}</div>
        <el-timeline>
          <el-timeline-item
            v-for="(point, id) in articleList[index]"
            :key="id"
            :timestamp="point.create_time.substr(8, 2) + '日'"
          >
            {{ point.title }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Archive",
  data() {
    return {
      dateList: [], //日期列表
      articleList: []
    };
  },
  filters: {
    getDay(item) {
      return item.substr(8, 2);
    },
    getDate(item) {
      return item.substr(0, 4) + "年" + item.substr(5, 2) + "月";
    }
  },
  methods: {
    async getAllArticle() {
      const { data: res } = await this.http.get("article/getarticle");
      this.articleList = JSON.parse(res.data);
      console.log(this.articleList);
    },
    async getDateList() {
      const { data: res } = await this.http.get("article/finddatesort");
      this.dateList = JSON.parse(res.data);
      console.log(this.dateList);
      this.getDateArticle();
    },
    //根据日期归档文章
    async getDateArticle() {
      console.log(this.dateList);
      this.dateList.forEach(async data => {
        const { data: res } = await this.http.get("article/findarticlebydate", {
          params: {
            date: data.date //日期
          }
        });
        console.log(res.data);
        this.articleList.push(res.data);
        console.log(this.articleList);
      });
    }
  },
  created() {
    this.getDateList();
  }
};
</script>
<style lang="less" scoped>
#archive {
  height: 100%;
  background: #fff;
  margin: 10px;
  padding: 20px;
  .timeline {
    display: flex;
    flex-direction: column;
    .time {
      display: flex;
      flex-direction: column;
    }
    .date {
      width: 150px;
      line-height: 60px;
    }
  }
}
</style>
