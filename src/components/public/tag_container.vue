<template>
  <div class="tag-list">
    <div class="header">
      文章标签
    </div>
    <!-- 标签列表 -->
    <div class="container">
      <div class="tag" v-for="item in tagLists" :key="item.tag_id">
        {{ item.tag_name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tagList",
  data() {
    return {
      tagLists: []
    };
  },
  methods: {
    //获取标签列表
    async getTagList() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/tag/gettaglists"
      );
      console.log(res);
      this.tagLists = JSON.parse(res.data);
    }
  },
  created() {
    this.getTagList();
  }
};
</script>
<style lang="less" scoped>
.tag-list {
  margin: 10px 0;
  background: #fff;
  .header {
    padding: 10px 15px;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .tag {
      padding: 8px;
      margin: 5px;
      font-size: 10px;
      color: #333;
      background-color: #dadada;
      border-radius: 5px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        background-color: cadetblue;
        color: #fff;
      }
    }
  }
}
</style>
