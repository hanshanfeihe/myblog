import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import WriteArticle from "../components/WriteArticle.vue";
// import Index from '../components/Index.vue'
// import Manage from '../components/articleManage.vue'
import Public from "../views/publicPage/index.vue";
import publicIndex from "../components/public/index.vue";
import Message from "../components/public/Message.vue";
import About from "../components/public/about.vue";
import ArticleDetail from "../components/public/detail.vue";
import ArticleManage from "../components/admin/articleManage.vue";
import Login from "../views/Login.vue";
import SortManage from "../components/admin/sortManage.vue";
import TagManage from "../components/admin/tagManage.vue";
import ManageInfo from "../components/admin/manage_info.vue";
import tagArticle from "../components/public/tagArticle.vue";
import Archive from "../components/public/Archive.vue";
// import sortPage from "../components/public/sortPage.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/manage",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/writearticle",
        name: "WriteArticle",
        component: WriteArticle,
        props: true
      },
      {
        path: "/sortManage",
        name: "SortManage",
        component: SortManage
      },
      {
        path: "/tagManage",
        name: "TagManage",
        component: TagManage
      },
      {
        path: "/articlemanage",
        name: "ArticleManage",
        component: ArticleManage
      },
      {
        path: "/manage_info",
        name: "manage_info",
        component: ManageInfo
      }
    ]
  },
  {
    path: "/",
    // name: 'public',
    component: Public,
    // name: 'Index',
    redirect: "/index",
    children: [
      {
        path: "index",
        component: publicIndex,
        name: "publicIndex"
      },
      {
        path: "archive",
        component: Archive,
        name: "Archive"
      },
      {
        path: "/message",
        component: Message,
        name: "Message"
      },
      {
        path: "/about",
        component: About,
        name: "About"
      },
      {
        path: "/article/:id",
        component: ArticleDetail,
        name: "article/id",
        props: true
      },
      {
        path: "/tag/:name",
        component: tagArticle,
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
