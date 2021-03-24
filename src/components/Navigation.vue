<template>
  <div id="Navgation" :style="{ transform: 'translateY(' + y + '%)' }">
    <div class="content">
      <ul>
        <li
          v-for="(item, index) in navArray"
          :key="index"
          :class="currentIndex === item.id ? 'active' : ''"
        >
          <a href="javascript:" @click="toPage(item.id)"
            >{{ item.val }}
            <span class="triangle" v-if="item.child !== undefined"></span
          ></a>
          <ul v-if="item.child !== undefined" class="drowdown">
            <li v-for="(item1, index1) in item.child" :key="index1">
              <a href="">{{ item1.childval }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navgation",
  data() {
    return {
      navArray: [
        {
          id: 0,
          val: "首页",
          path: "/user"
        },
        {
          id: 1,
          val: "管理",
          path: "/user/manage"
        },
        {
          id: 2,
          val: "写文章",
          path: "/user/writearticle"
        },
        {
          id: 3,
          val: "关于我",
          path: "/user/about"
        }
      ],
      y: 0,
      flag: 0,
      currentIndex: 0
    };
  },
  mounted() {
    // window.addEventListener('scroll', this.scrollTop)
    this.checkRouterLocal(this.$route.path);
    // console.log(this.$route.path)
  },
  methods: {
    // scrollTop() {
    //   const t = window.pageYOffset
    //   const scroll = t - this.flag
    //   this.flag = t
    //   // console.log(scroll)
    //   if (scroll > 0) {
    //     this.y = -100
    //   } else {
    //     this.y = -0
    //   }
    // },
    toPage(id) {
      if (id !== this.currentIndex) {
        // console.log(id)
        // console.log(this.currentIndex)
        // console.log(this.navArray[id].path)
        // console.log(this.$router)
        this.$router.push(this.navArray[id].path);
      }
      // console.log(id)
    },
    checkRouterLocal(path) {
      // 查找当前路由下标高亮
      this.currentIndex = this.navArray.findIndex(item => item.path === path);
      // console.log(this.currentIndex)
    }
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      // console.log(path)
      // 获取当前路由下标
      this.checkRouterLocal(path);
      console.log(this.currentIndex);
    }
  }
};
</script>
<style lang="less" scoped>
#Navgation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 9999;
  background-color: #fff;
  transition: transform 0.5s;
  border-bottom: 1px solid #333;
  .content {
    display: flex;
    background-color: black;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    height: 60px;
    z-index: 9999;
    > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      // 选中样式
      .active > a {
        color: #12aa9c;
      }
      .active:hover:after {
        // transition: none;
        animation: none;
        width: 100%;
      }
      .active:after {
        height: 2px;
        width: 100%;
      }
      > li:hover:after {
        height: 2px;
        background: #12aa9c;
        width: 100%;
        // transition: all 0.5s;
        animation: border_width 0.3s linear;
      }
      li:after {
        position: absolute;
        content: "";
        display: block;
        top: 58px;
        left: 50%;
        width: 0%;
        // transition: all 0.5s;
        transform: translateX(-50%);
        // transform-origin: center;
        background-color: #75cfb8;
      }
      > li {
        display: block;
        position: relative;
        box-sizing: border-box;
        width: 100px;
        margin: 0 20px;
        height: 60px;
        line-height: 60px;
        > a {
          display: block;
          position: relative;
          // background-color: skyblue;
          color: #fff;
          z-index: 999;
          height: 58px;
          width: 100%;
          transition: all 0.5s;
        }
        .drowdown {
          // overflow: hidden;
          position: relative;
          text-align: center;
          z-index: -1;
          background-color: snow;
          transform: translateY(-90px);
          transition: all 0.5s;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .drowdown li {
          width: 100%;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #ccc;
        }
        .drowdown li:hover a {
          color: #75cfb8;
        }
        .triangle {
          display: inline-block;
          border-style: solid;
          border-width: 8px 8px 0 8px;
          border-color: #fff transparent transparent transparent;
          transition: all 0.5s;
        }
      }
      > li:hover > a {
        color: #12aa9c;
      }
      li:hover .drowdown {
        // display: block;
        transform: translateY(0px);
      }
      li:hover .triangle {
        border-color: #ff8a00 transparent transparent transparent;
        transform: rotateZ(180deg);
      }
      @keyframes border_width {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
    }
  }
}
</style>
