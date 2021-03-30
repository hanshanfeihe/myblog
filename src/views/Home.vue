<template>
  <div class="home">
    <el-container>
      <!-- <navigation></navigation> -->
      <!-- <Header></Header> -->
      <el-header>
        <div class="header">
          康康博客后台管理系统
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            :default-active="activePath"
            unique-opened
            :router="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>博客管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item.path"
                  @click="toPage(item.path)"
                  v-for="(item, index) in routes"
                  :key="index"
                  >{{ item.name }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>本站信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item.path"
                  @click="toPage(item.path)"
                  v-for="(item, index) in manage"
                  :key="index"
                  >{{ item.name }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Navigation from '../components/Navigation.vue'
// import Header from "../components/admin/header.vue";
// import Navigation from "../components/admin/navigation";
export default {
  components: {
    // Header
    // Navigation
  },
  data() {
    return {
      activePath: "writearticle",
      routes: [
        {
          path: "/writearticle",
          name: "写文章"
        },
        {
          path: "/articlemanage",
          name: "文章管理"
        },
        {
          path: "/sortmanage",
          name: "分类管理"
        },
        {
          path: "/tagmanage",
          name: "标签管理"
        }
      ],
      manage: [
        {
          path: "/manage_info",
          name: "关于本站"
        },
        {
          path: "/bloger_info",
          name: "个人信息"
        }
      ]
    };
  },
  name: "Home",
  mounted() {
    window.document.body.style.backgroundColor = "#ededed";
  },
  watch: {
    $route() {
      this.activePath = this.$route.path;
      console.log(this.activePath);
    }
  },
  methods: {
    handleOpen(index, path) {
      console.log(index);
      console.log(path);
    },
    handleClose() {},
    toPage(path) {
      // this.$router.push(path);
      this.activePath = path;
      window.sessionStorage.setItem("activePath", this.activePath);
      this.$router.push(path);
      console.log(this.activePath);
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    console.log(this.activePath);
    if (!window.localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .el-header {
    height: 60px;
    padding: 0 20px;
    background-color: #2b2e4a;
    color: #fff;
    font-size: 20px;
    font-weight: bolder;
    line-height: 60px;
  }
}
.el-aside {
  position: absolute;
  width: 220px !important;
  background-color: #333744;
  top: 60px;
  overflow: auto;
  bottom: 0;
}
.el-menu {
  border-right: none;
}
.el-main {
  width: calc(100% - 220px);
  position: absolute;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0;
}
</style>
