import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WriteArticle from '../components/WriteArticle.vue'
// import Index from '../components/Index.vue'
// import Manage from '../components/articleManage.vue'
import Public from '../views/publicPage/index.vue'
import publicIndex from '../components/public/index.vue'
import Message from '../components/public/Message.vue'
import About from '../components/public/about.vue'
import ArticleDetail from '../components/public/detail.vue'
import ArticleManage from '../components/admin/articleManage.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/user',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/user/info/writearticle',
        name: 'WriteArticle',
        component: WriteArticle,
        props: true
      },
      {
        path: '/user/manage/articlemanage',
        name: 'ArticleManage',
        component: ArticleManage
      }
    ]
  },
  {
    path: '/',
    // name: 'public',
    component: Public,
    // name: 'Index',
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'publicIndex',
        component: publicIndex
      },
      {
        path: '/message',
        component: Message,
        name: 'Message'
      },
      {
        path: '/about',
        component: About,
        name: 'About'
      },
      {
        path: '/article/:id',
        component: ArticleDetail,
        name: 'article/id',
        props: true
      }
    ]
  }
  // {
  //   path: '/manage',
  //   name: 'Manage',
  //   component: Manage
  // }
]
//解决取消路由跳转时报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
const router = new VueRouter({
  routes
})
export default router
