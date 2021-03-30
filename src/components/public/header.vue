<template>
  <!-- blog-header start -->
  <div class="top">
    <div class="header" :id="isAbsolute ? 'absolute' : ''">
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
    <div style="height:60px;" v-if="isAbsolute"></div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      currentIndex: 1,
      navList: [
        {
          id: 1,
          name: "首页",
          path: "/index",
          icon: "fa-home"
        },
        {
          id: 2,
          name: "归档",
          path: "/archive",
          icon: "fa-sort"
        },
        {
          id: 3,
          name: "留言墙",
          path: "/message",
          icon: "fa-comments-o"
        },
        {
          id: 4,
          name: "关于我",
          path: "/about",
          icon: "fa-male"
        }
      ],
      isAbsolute: false //是否绝对定位
    };
  },
  methods: {
    toPage(item) {
      this.currentIndex = item.id;
      this.$router.push(item.path);
    },
    checkNavId(path) {
      this.navList.forEach(item => {
        if (item.path === path) {
          console.log(item.id);
          this.currentIndex = item.id;
        }
      });
    }
  },
  watch: {
    $route() {
      console.log(this.$route.path);
      this.checkNavId(this.$route.path);
    },
    isAbsolute() {
      // console.log(this.isAbsolute);
    }
  },
  mounted() {
    this.checkNavId(this.$route.path);
    window.addEventListener("scroll", () => {
      // console.log(document.documentElement.scrollTop)
      if (document.documentElement.scrollTop > 200) {
        this.isAbsolute = true;
      } else {
        this.isAbsolute = false;
      }
    });
  },
  created() {
    // window.document.body.style.backgroundColor = '#e7e7e7'
  }
};
</script>
<style lang="less" scoped>
#absolute {
  position: fixed;
  top: 0;
  left: 0;
  // overflow: hidden;
  z-index: 9999;
  // margin-bottom: 60px;
}
.logo-header {
  height: 200px;
  width: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // background-color: aquamarine;
  text-align: center;
  .logo {
    a {
      display: block;
      text-indent: -99999rem;
      width: 200px;
      height: 200px;
      background-image: url("../../assets/my-logo.png");
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  .nav {
    width: 100%;
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
