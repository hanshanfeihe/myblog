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
      @click="checkout(index, item.sort_id)"
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
    checkout(index, id) {
      window.sessionStorage.setItem("index", index);
      // console.log(window.sessionStorage);
      console.log(this.$route.name);
      this.selectIndex = index;
      this.$emit("selectedIndex", id);
      this.$router.push({ name: "publicIndex", params: { sort_id: id } });
      this.toTop();
    },
    selectDefault() {
      window.sessionStorage.setItem("index", -1);
      this.selectIndex = -1;
      this.$emit("selectedIndex", null);
      this.toTop();
    },
    // 回到顶部
    toTop() {
      clearInterval(time1);
      // window.scroll(0, 0)
      // console.log(document.documentElement)
      // document.documentElement.scrollTop = 0
      let time1 = setInterval(() => {
        let y = document.documentElement.scrollTop;
        // console.log(y)
        if (y > 0) {
          document.documentElement.scrollTop = y - 50;
        } else {
          clearInterval(time1);
        }
      }, 10);
    }
  },
  mounted() {
    if (window.sessionStorage.getItem("index")) {
      this.selectIndex = window.sessionStorage.getItem("index");
    }
  },
  created() {
    this.selectIndex = -1;
    // this.$emit("selectedIndex", null);
    this.getCategoryList();
  }
};
</script>
<style lang="less" scoped>
#category {
  width: 100%;
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
