<template>
  <div class="blog-item">
    <div class="a-head">
      <div class="title" @click="toDetail">{{ itemValue.title }}</div>
      <div class="publish_time">
        <i class="fa fa-fw fa-time" aria-hidden="true"></i>
        <span>{{ itemValue.create_time | formatTime }}</span>
      </div>
    </div>
    <div class="content">
      <div class="desc" v-html="itemValue.blog_desc"></div>
    </div>
    <div class="about">
      <div class="sort">
        <span class="sort-label name">分类：</span>
        <span class="sort" style="color:skyblue;">{{
          itemValue.Sort.sort_name
        }}</span>
      </div>
      <div class="tag">
        <span class="tag-label name">标签：</span>
        <span v-if="itemValue.Tags.length === 0">暂无标签</span>
        <span v-for="item in itemValue.Tags" :key="item.tag_id">
          <i class="fa fa-fw fa-tag" aria-hidden="true"></i>
          <span v-if="itemValue.Tags.length > 0" style="color:skyblue;">{{
            item.tag_name
          }}</span>
        </span>
      </div>
      <div class="reply">
        <span class="reply-label name">评论数：</span>
        {{ itemValue.Comments.length }}
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  name: "blogItem",
  data() {
    return {
      itemValue: this.item
    };
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  filters: {
    formatTime(val) {
      return val.substr(0, 11);
    }
  },
  methods: {
    toDetail() {
      this.$router.push("/article/" + this.item.id);
    }
  },
  created() {
    this.itemValue.blog_desc = marked(this.item.blog_desc);
  }
};
</script>
<style lang="less">
// v-html里添加样式会收到scoped作用域的影响
.blog-item {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  // height: 350px;
  // width: 100%;
  // min-width: 950px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 10px;
  // border-bottom: 1px solid #ccc;
  .a-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .publish_time {
      font-style: italic;
      font-family: "Times New Roman", Times, serif;
      font-size: 20px;
      margin-right: 20px;
      color: #60c30d;
    }
  }
  .title {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: normal !important;
    color: #21759b;
    transition: all 0.3s;
    cursor: pointer;
  }
  .title:hover {
    color: skyblue;
    padding-left: 20px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    img {
      width: 250px;
    }
  }
  .about {
    display: flex;
    font-style: italic;
    div {
      margin-right: 10px;
    }
    .name {
      color: #ccc;
    }
  }
  .reply {
    color: skyblue;
  }
}
</style>
