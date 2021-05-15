<template>
  <div class="blog-info">
    <div class="card">
      <div class="header">
        <img :src="blogerInfo.avatar" alt="头像" />
      </div>
      <div class="share-info">
        <div class="username">
          <span>博主：</span>
          {{ blogerInfo.name }}
        </div>
        <div class="posistion">
          <span>所在城市：</span>
          广东广州
        </div>
        <div class="share">
          <div class="link">
            <a :href="blogerInfo.git" target="_blank"
              ><i class="fa fa-github fa-fw "></i
            ></a>
          </div>
          <div class="link">
            <a :href="blogerInfo.weibo" target="_blank">
              <i class="fa fa-weibo fa-fw"></i
            ></a>
          </div>
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
        "admin/loginform"
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
  .share {
    width: 100%;
    .link {
      text-align: center;
      line-height: 48px;
      background: #ccc;
      width: 48px;
      margin: 5px;
      height: 48px;
      border-radius: 50%;
      &:hover {
        color: #fff;
        background: cornflowerblue;
      }
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
