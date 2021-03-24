<template>
  <div class="container">
    <div class="page" v-if="loaded">
      <div class="totop" v-if="showBtn" @click="toTop">回到顶部</div>
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
                      <span
                        style="margin-left:10px;"
                        @click="replyP(index, item)"
                        >回复</span
                      >
                    </div>
                    <div
                      class="reply-content"
                      v-for="item2 in item.Replies"
                      :key="item2.reply_id"
                    >
                      <!-- 回复区域 start -->
                      <div class="user-left">
                        <div class="avatar from">
                          <img :src="item2.from.avatar" alt="" />
                          <span class="nickname">{{
                            item2.from.nickname
                          }}</span>
                        </div>
                        <div
                          class="huifu"
                          v-if="item2.to"
                          style="margin:0 5px;font-size:12px;color:#000"
                        >
                          回复
                        </div>
                        <div class="avatar to" v-if="item2.to">
                          <img :src="item2.to.avatar" alt="" />
                          <span class="nickname">{{ item2.to.nickname }}</span>
                        </div>
                      </div>
                      <!-- 回复区域 end -->
                      <div class="reply">
                        <div class="content">
                          {{ item2.reply_content }}
                        </div>
                        <div class="post-time">
                          {{ item2.createdAt }}
                          <span
                            style="margin-left:10px;"
                            @click="reply(index, item2)"
                            >回复</span
                          >
                        </div>
                      </div>
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
                          v-model="reply_content"
                          :placeholder="'回复@' + replyName + ':'"
                        ></textarea>
                        <my-button
                          btnValue="发布评论"
                          type="primary"
                          @click="toReply"
                        ></my-button>
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
    </div>
    <div class="loading" v-else>
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js";
import "highlight.js/styles/darcula.css";
import myButton from "../my-button/index.vue";
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
    return hljs.highlightAuto(code).value;
  }
});
export default {
  name: "Detail",
  data() {
    return {
      loaded: false, //内容是否获取
      articleInfo: {},
      commentList: [], //评论列表
      Replies: [], //回复列表
      sort_name: "",
      content: "",
      avatar: "",
      nickName: "",
      email: "",
      visitor: {},
      v_id: "",
      qq: "",
      userAvatar: "avatar.jpg",
      replyIndex: "",
      replyName: "",
      reply_content: "",
      replyForm: {
        from_id: "",
        to_id: "",
        reply_content: "",
        CommentCommentId: "",
        article_id: ""
      },
      showBtn: false
    };
  },
  filters: {
    formatTime(val) {
      if (val) {
        return val.substr(0, 11);
      }
      // console.log(typeof val)
    }
  },
  watch: {},
  computed: {
    // async avatar(){
    //   const {data:res} = this.http.get()
    // }
  },
  components: {
    myButton
  },
  props: ["id"],
  methods: {
    getAvatar() {},
    reply(index, item) {
      this.replyIndex = index;
      // if (index === this.replyIndex) {
      //   this.replyIndex = ''
      // } else {
      //   this.replyIndex = index
      // }
      if (item) {
        this.replyName = item.from.nickname;
      }
      console.log(item);
      this.replyForm.from_id = this.v_id;
      this.replyForm.to_id = item.from_id;
      this.replyForm.CommentCommentId = item.CommentCommentId;
    },
    replyP(index, item) {
      if (index === this.replyIndex) {
        if (item.Visitor.nickname !== this.replyName) {
          this.replyName = item.Visitor.nickname;
        } else {
          this.replyIndex = "";
        }
      } else {
        this.replyIndex = index;
        this.replyName = item.Visitor.nickname;
      }
      this.replyForm.from_id = this.v_id;
      this.replyForm.to_id = null;
      this.replyForm.CommentCommentId = item.comment_id;
      console.log(item);
    },
    // 评论回复
    async toReply() {
      this.replyForm.reply_content = this.reply_content;
      this.replyForm.article_id = this.id;
      console.log(this.replyForm);
      if (this.replyForm.reply_content) {
        const { data: res } = await this.http.post(
          "http://127.0.0.1:3000/reply/insertreply",
          this.replyForm
        );
        if (res.meta.status === 200) {
          this.message.success("回复成功");
          this.replyIndex = "";
          this.getArticleInfo();
        } else {
          this.message.error("回复失败");
          this.replyIndex = "";
        }
      }
    },
    async commitComment() {
      let Comment = {
        articleId: this.id,
        content: this.content,
        VisitorVId: this.v_id
      };
      const { data: res } = await this.http.post(
        "http://127.0.0.1:3000/comment/insertcomment",
        Comment
      );
      console.log(res);
      // window.localStorage.setItem('visitor', {
      //   avatar: Comment.avatar,
      //   url: Comment.url,
      //   email: Comment.email,
      //   nickName: Comment.nickName
      // })
    },
    async setVisitor() {
      this.qq = new RegExp(`[1-9][0-9]{4,}`).exec(this.email);
      if (this.qq) {
        this.avatar = "http://q1.qlogo.cn/g?b=qq&nk=" + this.qq + "&s=100";
        const data = await this.http.get(
          "http://api.btstu.cn/qqxt/api.php?qq=" + this.qq
        );
        this.nickName = data.data.name;
        this.visitor = {
          nickname: this.nickName,
          email: this.email,
          avatar: this.avatar
        };
        if (this.visitor) {
          const { data: res } = await this.http.post(
            "http://127.0.0.1:3000/visitor/insertvisitor",
            this.visitor
          );
          if (res.meta.status === 200) {
            this.visitor.v_id = res.data.v_id;
            this.v_id = res.data.v_id;
            window.localStorage.setItem(
              "visitor",
              JSON.stringify(this.visitor)
            );
          }
        }
      }
    },
    async getArticleInfo() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/findarticlebyid?id=" + this.id
      );
      console.log(JSON.parse(res.data));
      this.articleInfo = JSON.parse(res.data);
      this.commentList = this.articleInfo.Comments;
      // console.log(this.articleInfo.content)
      this.articleInfo.content = marked(this.articleInfo.content);
      this.articleInfo.content = marked(this.articleInfo.content).replace(
        /<pre>/g,
        "<pre class='hljs'>"
      );
      this.sort_name = this.articleInfo.Sort.sort_name;
      setTimeout(() => {
        this.loaded = true;
      }, 3000);
    },
    // 回到顶部动画
    toTop() {
      clearInterval(time1);
      // window.scroll(0, 0)
      // console.log(document.documentElement)
      // document.documentElement.scrollTop = 0
      let time1 = setInterval(() => {
        let y = document.documentElement.scrollTop;
        // console.log(y)
        if (y > 0) {
          document.documentElement.scrollTop = y - 50;
        } else {
          clearInterval(time1);
        }
      }, 10);
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      // console.log(window.scrollY);
      if (window.scrollY > 750) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    });
  },
  async created() {
    // console.log(this.id)
    this.getArticleInfo();
    // console.log(this.articleInfo.content)

    // console.log(this.visitor)
    this.visitor = JSON.parse(window.localStorage.getItem("visitor"));
    console.log(this.visitor);
    if (this.visitor) {
      this.nickName = this.visitor.nickname;
      this.avatar = this.visitor.avatar;
      this.v_id = this.visitor.v_id;
    }
    // console.log(this.articleInfo.Sort.sort_name)
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/typo.css");
.container {
  // position: relative;
  width: 100%;
  min-height: 100vh;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  // background-color: aquamarine;
  hr {
    border: 0;
    margin: 0;
    width: 40%;
    height: 40%;
    position: absolute;
    border-radius: 50%;
    animation: spin 2s infinite;
  }
  @keyframes spin {
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: translate(160%);
    }
    50% {
      transform: translate(160%, 160%);
    }
    75% {
      transform: translate(0, 160%);
    }
  }
}
.loading :first-child {
  background-color: #19a68c;
  animation-delay: -1.5s;
}
.loading :nth-child(2) {
  background-color: #f63f3a;
  animation-delay: -1s;
}
.loading :nth-child(3) {
  background-color: #fda543;
  animation-delay: -0.5s;
}
.loading :last-child {
  background-color: #193b48;
}
.page {
  position: relative;
  width: 100%;
  // transition: all 0.5s;
}
.totop {
  position: fixed;
  right: 20px;
  bottom: 150px;
  width: 80px;
  height: 80px;
  text-align: center;
  background-color: aquamarine;
  opacity: 0.5;
  border-radius: 50%;
  line-height: 80px;
  white-space: nowrap;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
.totop:hover {
  opacity: 1;
  border: 1px dashed skyblue;
}
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
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
            .reply-content {
              width: 100%;
              .user-left {
                display: flex;
                align-items: center;
                // justify-content: center;
                img {
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                }
                .nickname {
                  color: skyblue;
                  margin: 0 5px;
                }
                .avatar {
                  display: flex;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
