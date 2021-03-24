<template>
  <div class="new-article">
    <div class="container">
      <div class="header">
        最新文章
      </div>
      <div class="articles">
        <div class="artile-item">
          <div class="title">文章标题一</div>
          <div class="date">2021-2-18</div>
        </div>
        <div class="artile-item">
          <div class="title">文章标题一</div>
          <div class="date">2021-2-18</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newArticle"
};
</script>
<style lang="less" scoped>
.new-article {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 10px 0;
  .container {
    .header {
      background-color: skyblue;
      color: #fff;
      height: 30px;
      padding: 0 10px;
      line-height: 30px;
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
      }
    }
  }
}
</style>
