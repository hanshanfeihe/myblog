<template>
  <div class="blog-info">
    <div class="card">
      <div class="header">
        <img
          src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3762143736,532416092&fm=11&gp=0.jpg"
          alt="头像"
        />
      </div>
      <div class="share-info">
        <div class="username">
          <span>博主：</span>
          Kang
        </div>
        <div class="posistion">
          <span>所在城市：</span>
          广东广州
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BlogInfo"
};
</script>
<style lang="less" scoped>
.blog-info {
  border-bottom: 1px solid #ccc;
  .header {
    display: flex;
    justify-content: center;
    img {
      height: 200px;
    }
  }
  padding: 10px;
  background-color: #fff;
  .share-info {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
