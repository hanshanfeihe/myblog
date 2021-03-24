<template>
  <div class="children-aside">
    <div class="ctrl">|||</div>
    <ul>
      <li
        class="f-nav"
        style="z-index:9;"
        v-for="item in navList"
        :key="item.id"
      >
        <div
          @click="showChildNav(item)"
          :class="childActive === item.id ? 'fa-active' : ''"
        >
          {{ item.name }}
        </div>
        <ul :class="currentIndex === item.id ? 'active' : ''">
          <li
            v-for="citem in item.child"
            :key="citem.cid"
            @click="toPage(citem)"
            :class="currentChildIndex === citem.cid ? 'childactive' : ''"
          >
            <a href="javascript:">{{ citem.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      isActive: false,
      navList: [
        {
          id: 1,
          name: "管理",
          child: [
            {
              name: "文章管理",
              cid: "1-1",
              path: "/user/manage/articlemanage"
            },
            {
              name: "分类管理",
              cid: "1-2",
              path: "/user/manage/sortmanage"
            },
            {
              name: "标签管理",
              cid: "1-3",
              path: "/user/manage/tagmanage"
            }
          ]
        },
        {
          id: 2,
          name: "个人中心",
          child: [
            {
              cid: "2-1",
              name: "信息管理",
              path: "/user/info/manage_info"
            },
            {
              cid: "2-2",
              name: "写文章",
              path: "/user/info/writearticle"
            }
          ]
        }
      ],
      currentIndex: 1,
      currentChildIndex: "1-1",
      childActive: 1
    };
  },
  watch: {
    currentChildIndex() {
      this.childActive = Number(this.currentChildIndex.charAt("0"));
      console.log(this.childActive);
    },
    $route() {
      let path = this.$route.path;
      console.log(path);
      this.checkCurrentIndex(path);
    }
  },
  methods: {
    showChildNav(item) {
      if (this.currentIndex !== item.id) {
        this.currentIndex = item.id;
      } else {
        this.currentIndex = 0;
      }
    },
    checkCurrentIndex(path) {
      console.log(this.currentIndex);
      console.log(this.navList[this.currentIndex - 1].child);
      this.navList.forEach(item => {
        item.child.forEach(citem => {
          if (citem.path === path) {
            this.currentChildIndex = citem.cid;
          }
        });
        // this.currentIndex = item.id
        this.showChildNav(item);
      });

      console.log(this.currentChildIndex);
    },
    toPage(citem) {
      console.log(citem.cid);
      this.currentChildIndex = citem.cid;
      console.log(this.currentChildIndex);
      this.$router.push(citem.path);
    }
  },
  created() {
    this.checkCurrentIndex(this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.children-aside {
  width: 100%;
  height: 100%;
  margin-top: 60px;
  text-align: center;
  .ctrl {
    width: 100%;
    height: 50px;
    padding: 14px;
    cursor: pointer;
  }
  li {
    position: relative;
  }
  .f-nav {
    width: 100%;
    line-height: 60px;
    div {
      display: flex;
      padding-left: 20px;
      position: relative;
      line-height: 60px;
      background-color: #fff;
      z-index: 9;
      cursor: pointer;
    }
    .fa-active {
      color: skyblue;
    }
    div:hover {
      color: blue;
    }
    > .active {
      height: 180px;
      transform: translateY(0);
      > li {
        height: 60px;
        // opacity: 1;
      }
    }
    > ul {
      height: 0;
      position: relative;
      z-index: 8;
      transform: translateY(-60px);
      transition: all 0.3s;
      > li {
        height: 0;
        // opacity: 0;
        transition: height 0.3s;
      }
      li:hover {
        opacity: 0.5;
      }
      li:hover a {
        color: blue;
      }
      .childactive {
        background-color: #f0f6ff;
      }
      .childactive a {
        color: skyblue;
      }
      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
}
</style>
