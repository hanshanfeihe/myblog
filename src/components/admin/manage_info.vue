<template>
  <div id="manage-info">
    <div class="nowposition">
      当前位置：个人中心/<span class="p-name">信息管理</span>
    </div>
    <!-- 编辑器 -->
    <vditor v-model="aboutInfo" id="vditor-desc" v-if="loaded"></vditor>
    <div class="options">
      <my-button btnValue="保存" @click="saveInfo" type="primary"></my-button>
      <my-button btnValue="确定" @click="submitInfo" type="primary"></my-button>
    </div>
  </div>
</template>
<script>
import Vditor from "../vditor/index.vue";
import MyButton from "../my-button/index.vue";
export default {
  name: "Manage_Info",
  data() {
    return {
      aboutInfo: "",
      id: "",
      loaded: false //判断内容是否加载完毕
    };
  },
  components: {
    Vditor,
    MyButton
  },
  methods: {
    async submitInfo() {
      // console.log(this.aboutInfo);
      const { data: res } = await this.http.post(
        "aboutinfo/insertaboutinfo",
        {
          content: this.aboutInfo
        }
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.message.success("发布成功");
      }
    },
    async getAboutInfo() {
      const { data: res } = await this.http.get(
        "aboutinfo/getaboutinfo"
      );
      // console.log(res.data[0].content);
      this.aboutInfo = res.data[0].content;
      this.id = res.data[0].id;
      this.loaded = true;
    },
    //保存关于本站信息
    async saveInfo() {
      console.log(this.id);
      const { data: res } = await this.http.put(
        "aboutinfo/updateaboutinfo",
        {
          content: this.aboutInfo,
          id: this.id
        }
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.message.success("保存成功");
      } else {
        this.message.error("保存失败");
      }
    }
  },
  created() {
    //获取关于本站初始数据
    this.getAboutInfo();
  }
};
</script>
<style lang="less" scoped>
#manage-info {
  padding: 20px;
  .nowposition {
    width: 100%;
    padding-left: 10px;
    border-left: 10px solid skyblue;
    margin-bottom: 10px;
    .p-name {
      font-size: 16px;
      color: skyblue;
    }
  }
  .options {
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
