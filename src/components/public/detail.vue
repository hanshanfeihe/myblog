<template>
  <div class="article">
    <div class="container">
      <div class="page">
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
            <article-comment :articleId="id"></article-comment>
          </div>
          <div class="right newArticle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js";
import "highlight.js/styles/darcula.css";
import articleComment from "./comment.vue";
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
  watch: {
    id() {
      this.getArticleInfo();
    }
  },
  components: {
    articleComment
  },
  computed: {
    // async avatar(){
    //   const {data:res} = this.http.get()
    // }
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
.article {
  padding: 10px;
}
.container {
  // position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
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
