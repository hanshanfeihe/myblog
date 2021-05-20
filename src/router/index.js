import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import WriteArticle from "../components/WriteArticle.vue";
// import Index from '../components/Index.vue'
// import Manage from '../components/articleManage.vue'
import Public from "../views/publicPage/index.vue";
import publicIndex from "../components/public/index.vue";
import Comment from "../components/public/comment.vue";
import About from "../components/public/about.vue";
import ArticleDetail from "../components/public/detail.vue";
import ArticleManage from "../components/admin/articleManage.vue";
import Login from "../views/Login.vue";
import SortManage from "../components/admin/sortManage.vue";
import TagManage from "../components/admin/tagManage.vue";
import ManageInfo from "../components/admin/manage_info.vue";
import tagArticle from "../components/public/tagArticle.vue";
import Archive from "../components/public/Archive.vue";
import blogerInfo from "../components/admin/bloger_info.vue";
// import sortPage from "../components/public/sortPage.vue";
import commentManage from "../components/admin/comment_manage.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/manage",
    name: "Home",
    component: Home, //后台管理界面根组件
    redirect: "/writearticle",
    children: [
      {
        path: "/writearticle",
        name: "WriteArticle",
        component: WriteArticle, //写文章组件
        props: true
      },
      {
        path: "/sortManage",
        name: "SortManage",
        component: SortManage //分类管理组件
      },
      {
        path: "/tagManage",
        name: "TagManage",
        component: TagManage //标签管理组件
      },
      {
        path: "/articlemanage",
        name: "ArticleManage",
        component: ArticleManage //文章管理组件
      },
      {
        path: "/commentManage",
        name: "commentManage",
        component: commentManage //评论管理组件
      },
      {
        path: "/manage_info",
        name: "manage_info",
        component: ManageInfo //关于本站信息管理组件
      },
      {
        path: "/bloger_info",
        name: "bloger_info",
        component: blogerInfo //博主信息管理组件
      }
    ]
  },
  {
    path: "/",
    // name: 'public',
    component: Public, //前台界面根组件
    // name: 'Index',
    redirect: "/index",
    children: [
      {
        path: "index",
        component: publicIndex, //网站首页
        name: "publicIndex"
      },
      {
        path: "archive",
        component: Archive, //文章归档
        name: "Archive"
      },
      {
        path: "/comment",
        component: Comment, //文章评论
        name: "Comment"
      },
      {
        path: "/about",
        component: About, //关于本站
        name: "About"
      },
      {
        path: "/article/:id",
        component: ArticleDetail, //文章详情
        name: "article/id",
        props: true
      },
      {
        path: "/tag/:name",
        component: tagArticle, //文章标签下显示文章
        name: "tag",
        props: true
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
  // {
  //   path: '/manage',
  //   name: 'Manage',
  //   component: Manage
  // }
];

//解决取消路由跳转时报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes
});
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (to.name === "Home") {
    if (!window.localStorage.getItem("token")) {
      console.log("haha");
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
