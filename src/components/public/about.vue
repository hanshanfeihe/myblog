<template>
  <div id="about">
    <div class="container">
      <div class="content typo" v-html="content"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  name: "About",
  data() {
    return {
      content: ""
    };
  },
  async created() {
    //获取Markdown内容
    const { data: res } = await this.http.get("aboutinfo/getaboutinfo");
    console.log(res);
    //Markdown内容转换
    this.content = marked(res.data[0].content);
  }
};
</script>
<style lang="less" scoped>
#about {
  margin: 10px;
  padding: 100px;
  background: #fff;
}
</style>
