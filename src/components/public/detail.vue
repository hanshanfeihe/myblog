<template>
  <div class="detail typo">
    <div class="left articleinfo">
      <div class="title">
        {{ articleInfo.title }}
      </div>
      <div class="article-about">
        <div class="sort">
          <span
            ><i class="fa fa-book fa-fw"></i
            ><span style="color:skyblue;margin-left:5px;">{{
              sort_name
            }}</span></span
          >
        </div>
        <div class="time">
          <span>
            <i class="fa fa-calendar fa-fw"></i>日期：
            {{ articleInfo.create_time | formatTime }}</span
          >
        </div>
      </div>
      <div class="article-content">
        <div id="content" v-html="articleInfo.content"></div>
      </div>
      <div class="comment">
        <div class="comment-title">
          文章评论
        </div>
        <div class="comment-body">
          <div class="input">
            <!-- <div class="label-name">昵称(必填)</div>
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="输入你的大名吧"
            /> -->
            <div class="label-name">qq邮箱(必填)</div>
            <input
              type="text"
              name="email"
              id="email"
              v-model="email"
              placeholder="获取用户头像"
            />
            <div class="label-name">网址(选填)</div>
            <input type="text" name="url" id="url" />
            <div class="option">
              <my-button
                type="primary"
                btnValue="生成用户身份"
                @click="setVisitor"
              ></my-button>
            </div>
            <div class="user-comment">
              <div class="user-avatar">
                <div class="avatar">
                  <img :src="avatar ? avatar : userAvatar" alt="" />
                </div>
                <div class="nickname">{{ nickName }}</div>
              </div>
              <div class="textarea">
                <textarea
                  name=""
                  id="content"
                  v-model="content"
                  placeholder="来说几句吧"
                ></textarea>
                <my-button
                  btnValue="发布评论"
                  type="primary"
                  @click="commitComment"
                ></my-button>
              </div>
            </div>
          </div>
        </div>
        <div class="commentslist">
          <div class="comment-title">
            评论列表
          </div>
          <div class="comment-content">
            <div
              class="comment-item"
              v-for="(item, index) in commentList"
              :key="index"
            >
              <div class="user">
                <div class="avatar">
                  <img :src="item.Visitor.avatar" alt="" />
                </div>
                <div class="username">{{ item.Visitor.nickname }}</div>
              </div>
              <div class="item-content">
                <div class="conent">
                  {{ item.content }}
                </div>
                <div class="post-time">
                  {{ item.createdAt }}
                  <span style="margin-left:10px;" @click="reply(index)"
                    >回复</span
                  >
                </div>
                <div class="user-comment" v-if="replyIndex === index">
                  <div class="user-avatar">
                    <div class="avatar">
                      <img :src="avatar ? avatar : userAvatar" alt="" />
                    </div>
                    <div class="nickname">{{ nickName }}</div>
                  </div>
                  <div class="textarea">
                    <textarea
                      name=""
                      id="content"
                      v-model="content"
                      :placeholder="'回复@' + item.Visitor.nickname + ':'"
                    ></textarea>
                    <my-button btnValue="发布评论" type="primary"></my-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right newArticle"></div>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js'
import 'highlight.js/styles/darcula.css'
import myButton from '../my-button/index.vue'
// import 'highlight.js/styles/dark.css'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  escaped: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    // console.log('code', code)
    // return   hljs.highlight(lang, code, false,true).value;
    return hljs.highlightAuto(code).value
  }
})
export default {
  name: 'Detail',
  data() {
    return {
      articleInfo: {},
      commentList: [], //评论列表
      sort_name: '',
      content: '',
      avatar: '',
      nickName: '',
      email: '',
      visitor: {},
      v_id: '',
      qq: '',
      userAvatar: 'avatar.jpg',
      replyIndex: ''
    }
  },
  filters: {
    formatTime(val) {
      if (val) {
        return val.substr(0, 11)
      }
      // console.log(typeof val)
    }
  },
  watch: {},
  components: {
    myButton
  },
  computed: {},
  props: ['id'],
  methods: {
    getAvatar() {},
    reply(index) {
      if (index === this.replyIndex) {
        this.replyIndex = ''
      } else {
        this.replyIndex = index
      }
      console.log(this.replyIndex)
    },
    // 评论回复
    async toReply(id) {
      console.log(id)
      let replyComment = {
        articleId: this.id,
        content: this.replyContent,
        avatar: this.avatar,
        nickName: this.nickName,
        email: this.email,
        url: this.url
      }
      const { data: res } = await this.http.post(
        'http://127.0.0.1:3000/comment/insertcomment',
        replyComment
      )
      console.log(res)
    },
    async commitComment() {
      let Comment = {
        articleId: this.id,
        content: this.content,
        VisitorVId: this.v_id
      }
      const { data: res } = await this.http.post(
        'http://127.0.0.1:3000/comment/insertcomment',
        Comment
      )
      console.log(res)
      // window.localStorage.setItem('visitor', {
      //   avatar: Comment.avatar,
      //   url: Comment.url,
      //   email: Comment.email,
      //   nickName: Comment.nickName
      // })
    },
    async setVisitor() {
      this.qq = new RegExp(`[1-9][0-9]{4,}`).exec(this.email)
      if (this.qq) {
        this.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=' + this.qq + '&s=100'
        const data = await this.http.get(
          'http://api.btstu.cn/qqxt/api.php?qq=' + this.qq
        )
        this.nickName = data.data.name
        this.visitor = {
          nickname: this.nickName,
          email: this.email,
          avatar: this.avatar
        }
        if (this.visitor) {
          const { data: res } = await this.http.post(
            'http://127.0.0.1:3000/visitor/insertvisitor',
            this.visitor
          )
          if (res.meta.status === 200) {
            this.visitor.v_id = res.data.v_id
            this.v_id = res.data.v_id
            window.localStorage.setItem('visitor', JSON.stringify(this.visitor))
          }
        }
      }
    }
  },
  async created() {
    // console.log(this.id)
    const { data: res } = await this.http.get(
      'http://127.0.0.1:3000/article/findarticlebyid?id=' + this.id
    )
    console.log(JSON.parse(res.data))
    this.articleInfo = JSON.parse(res.data)
    this.commentList = this.articleInfo.Comments
    // console.log(this.articleInfo.content)
    this.articleInfo.content = marked(this.articleInfo.content)
    this.articleInfo.content = marked(this.articleInfo.content).replace(
      /<pre>/g,
      "<pre class='hljs'>"
    )
    // console.log(this.articleInfo.content)
    this.sort_name = this.articleInfo.Sort.sort_name
    // console.log(this.visitor)
    this.visitor = JSON.parse(window.localStorage.getItem('visitor'))
    console.log(this.visitor)
    if (this.visitor) {
      this.nickName = this.visitor.nickname
      this.avatar = this.visitor.avatar
      this.v_id = this.visitor.v_id
    }
    // console.log(this.articleInfo.Sort.sort_name)
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/css/typo.css');
.detail {
  width: 100%;
  // padding: 20px 20px;
  // background-color: #ededed;
  // opacity: 0.5;
  .left {
    padding: 20px;
    // width: auto;
    // background-color: #fff;
    // box-shadow: 0px 0px 16px #ccc;
    border: 1px solid #eaeaea;
    .title {
      font-size: 26px;
      // color:
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .article-about {
      border-bottom: 1px solid skyblue;
    }
    .article-content {
      padding-top: 20px;
    }
    .comment {
      .user-comment {
        margin-top: 15px;
        width: 100%;
        display: flex;
        // flex-direction: column;
        align-items: center;
        // border: 1px solid sandybrown;
        .user-avatar {
          display: flex;
          text-align: center;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          .avatar {
            width: 48px;
            height: 48px;
            margin-right: 5px;
            border-radius: 50%;
            overflow: hidden;
          }
          .nickname {
            white-space: nowrap;
            color: cornflowerblue;
          }
        }
        .textarea {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          textarea {
            outline: none;
            width: 100%;
            resize: none;
            padding: 5px 8px;
            height: 100px;
          }
          button {
            border-radius: 6px;
          }
        }
      }
      .comment-title {
        width: 100%;
        line-height: 40px;
        line-height: 40px;
        padding-left: 10px;
        color: sandybrown;
        background-color: #202020;
      }
      .comment-body {
        .input {
          input {
            border: 1px solid #ccc;
            padding: 3px 5px;
            height: 34px;
            border-radius: 2px;
            font-size: 14px;
            color: #555;
            width: 100%;
          }
        }
      }
      .commentslist {
        cursor: pointer;
        margin-top: 10px;
        .comment-item {
          margin-top: 10px;
          display: flex;
          border-bottom: 1px solid #ccc;
          .user {
            min-width: 100px;
            display: flex;
            margin-right: 10px;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            .avatar {
              width: 38px;
              height: 38px;
              border-radius: 50%;
              overflow: hidden;
            }
            .username {
              white-space: nowrap;
              margin-left: 5px;
              color: skyblue;
            }
          }
          .item-content {
            display: flex;
            width: 100%;
            // align-items: center;
            flex-direction: column;
            justify-content: space-between;
            .post-time {
              color: #333;
              font-size: 12px;
              span:hover {
                color: skyblue;
              }
            }
          }
        }
      }
    }
  }
}
</style>
