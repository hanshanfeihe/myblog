<template>
  <div id="category">
    <div
      class="default sort-item"
      @click="selectDefault"
      :class="selectIndex == -1 ? 'selected' : ''"
    >
      所有文章
    </div>
    <div
      :class="selectIndex == index ? 'selected' : ''"
      class="sort-item"
      v-for="(item, index) in categoryList"
      :key="item.sort_id"
      @click="checkout(index)"
    >
      {{ item.sort_name }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
      selectIndex: -1 //默认选中展示所有文章
    };
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/sort/getsortlists"
      );
      this.categoryList = JSON.parse(res.data);
      console.log(this.categoryList);
    },
    checkout(index) {
      window.sessionStorage.setItem("index", index);
      console.log(window.sessionStorage);
      this.selectIndex = index;
    },
    selectDefault() {
      window.sessionStorage.setItem("index", -1);
      this.selectIndex = -1;
    }
  },
  mounted() {
    this.selectIndex = window.sessionStorage.getItem("index");
  },
  created() {
    this.getCategoryList();
  }
};
</script>
<style lang="less" scoped>
#category {
  .sort-item {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    transition: all 0.5s;
    &:hover {
      color: #fff;
      background: #4ebbf0;
    }
  }
  .selected {
    color: #fff;
    background: #4ebbf0;
  }
}
</style>
