<template>
  <div class="blog-info">
    <div class="card">
      <div class="header">
        <img :src="blogerInfo.avatar" alt="头像" />
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
  name: "BlogInfo",
  data() {
    return {
      blogerInfo: {
        id: "",
        git: "",
        weibo: "",
        name: "",
        avatar: ""
      }
    };
  },
  methods: {
    //获取博主信息
    async getBlogerInfo() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/admin/loginform"
      );
      console.log(res);
      this.blogerInfo.id = res.data.id;
      this.blogerInfo.git = res.data.git;
      this.blogerInfo.weibo = res.data.weibo;
      this.blogerInfo.avatar = res.data.avatar;
      this.blogerInfo.name = res.data.name;
    }
  },
  created() {
    this.getBlogerInfo();
  }
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
