<template>
  <!-- blog-header start -->
  <div class="header">
    <div class="title" style="color:#fff;">KANGKANG的个人博客</div>
    <!-- 导航栏start -->
    <div class="nav">
      <ul>
        <li
          :class="currentIndex === item.id ? 'active' : ''"
          v-for="item in navList"
          :key="item.id"
          @click="toPage(item)"
        >
          <i class="fa fa-fw" :class="item.icon" aria-hidden="true"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <!-- 导航栏end -->
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      currentIndex: 1,
      navList: [
        {
          id: 1,
          name: '首页',
          path: '/index',
          icon: 'fa-home'
        },
        {
          id: 2,
          name: '分类',
          path: '/category',
          icon: 'fa-sort'
        },
        {
          id: 3,
          name: '留言墙',
          path: '/message',
          icon: 'fa-comments-o'
        },
        {
          id: 4,
          name: '关于我',
          path: '/about',
          icon: 'fa-male'
        }
      ]
    }
  },
  methods: {
    toPage(item) {
      if (item.path !== '/category') {
        this.currentIndex = item.id
        this.$router.push(item.path)
      }
    },
    checkNavId(path) {
      this.navList.forEach((item) => {
        if (item.path === path) {
          // console.log(item.id)
          this.currentIndex = item.id
        }
      })
    }
  },
  watch: {
    $route() {
      console.log(this.$route.path)
      this.checkNavId(this.$route.path)
    }
  },
  created() {
    // window.document.body.style.backgroundColor = '#e7e7e7'
  }
}
</script>
<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 200px;
  background-position: center center;
  background-image: url('../../../public/bg1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // background: grey;
  .title {
    position: absolute;
    top: 30%;
    left: 70px;
    font-size: 24px;
    font-weight: 700;
    font-family: 'DFKai-SB';
  }
  .nav {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0 50px;
    color: black;
    font-weight: 700;
    background-color: #fff;
    // color: rgb(202, 199, 12);
    line-height: 60px;
    // opacity: 0.2;
    height: 60px;
    box-shadow: 0px 0px 10px rgba(50, 50, 93, 0.5);
    ul {
      display: flex;
      justify-content: flex-start;
      li {
        padding: 0 20px;
        margin-right: 10px;
        // background-color: skyblue;
      }
      .active {
        color: skyblue;
      }
      li:hover {
        color: skyblue;
      }
    }
  }
}
</style>
