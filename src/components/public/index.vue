<template>
  <div class="index">
    <div class="left content">
      <blog-item
        v-for="item in articleList"
        :key="item.id"
        :item="item"
      ></blog-item>
    </div>
    <div class="right">
      <div class="bloger-info" :class="isFixed ? 'fixed' : ''">
        <div class="bg"></div>
        <div class="link">
          <div class="link-item">
            <i class="fa fa-github fa-fw" aria-hidden="true"></i>
          </div>
          <div class="link-item">
            <i class="fa fa-weixin fa-fw" aria-hidden="true"></i>
          </div>
          <div class="link-item">
            <i class="fa fa-user fa-fw"></i>
          </div>
        </div>
        <div class="showInfo">
          <transition name="slide" mode="out-in">
            <p class="scrolltext" :key="text.id">{{ text.val }}</p>
          </transition>
        </div>
      </div>
      <div class="mulu">
        <div class="mulu-header">文章分类</div>
        <ul class="sort" v-for="(item, index) in sortList" :key="index">
          <li class="sort-item">
            {{ item.sort_name }}({{ item.Articles.length }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import blogItem from '../my-blogItem/index.vue'
export default {
  name: 'Index',
  data() {
    return {
      articleList: [],
      showInfo: [
        '喜欢香港电影，喜欢粤语歌曲',
        '目前大四,正在找工作中',
        '技能：HTML,CSS,JS,Vue等......'
      ],
      number: 0,
      isFixed: false,
      scrollY: 0,
      sortList: []
    }
  },
  watch: {
    scrollY() {
      if (this.scrollY > 210) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.showInfo[this.number]
      }
    }
  },
  components: {
    blogItem
  },
  methods: {
    startMove() {
      setTimeout(() => {
        if (this.number === 2) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 1000)
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
      // console.log(this.scrollY)
    })
  },
  async created() {
    const { data: res } = await this.http.get(
      'http://127.0.0.1:3000/article/getarticle'
    )
    const { data: res2 } = await this.http.get(
      'http://127.0.0.1:3000/sort/getsortlists'
    )
    // console.log(res)
    console.log(JSON.parse(res2.data))
    // console.log(JSON.stringify(res.data))
    this.articleList = JSON.parse(res.data)
    this.sortList = JSON.parse(res2.data)
    // console.log(typeof this.articleList)
    // console.log(this.articleList)
    this.startMove()
  }
}
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 100%;
    flex: 2;
    // flex-shrink: 0;
  }
  // overflow: hidden;
  // .fixed {
  //   // position: absolute;
  //   // // right: 0;
  //   // top: 0;
  //   // right: 10px;
  // }
  .right {
    position: relative;
    margin-left: 20px;
    width: 300px;
    .bloger-info {
      text-align: center;
      height: 350px;
      width: 100%;
      background-color: #ccc;
      box-shadow: 0px 0px 16px #ccc;
      .showInfo {
        position: relative;
        margin-top: 20px;
        overflow: hidden;
        .slide-enter-active,
        .slide-leave-active {
          transition: all 1s;
        }
        .slide-leave-to {
          transform: translateY(-20px);
          color: khaki;
        }
        .slide-enter {
          color: #ccc;
          transform: translateY(20px);
        }
      }
      .bg {
        width: 100%;
        text-align: center;
        height: 200px;
        background-position: top center;
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url('../../../public/bg4.jpg');
      }
      .link {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        .link-item {
          width: 48px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          margin-right: 10px;
          background-color: cornsilk;
          border-radius: 50%;
        }
        .link-item:hover {
          background-color: skyblue;
        }
        .link-item:hover {
          color: #fff;
        }
      }
    }
    .mulu {
      width: 300px;
      // height: 400px;
      margin-top: 15px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      background-color: #fff;
      .mulu-header {
        line-height: 40px;
        background-color: rosybrown;
      }
      .sort {
        cursor: pointer;
        .sort-item {
          line-height: 40px;
          background-color: #ededed;
          border-bottom: 1px solid #333;
        }
        .sort-item:hover {
          background-color: silver;
          color: royalblue;
          text-shadow: sandybrown;
        }
      }
    }
  }
}
</style>
