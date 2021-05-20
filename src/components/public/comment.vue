<template>
  <div id="message">
    <div class="header">留言墙</div>
    <div class="comment-form">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入留言内容"
        v-model="content"
        :autosize="{ minRows: 4, maxRows: 4 }"
      >
      </el-input>
      <div class="userform">
        <div class="tip">
          <el-alert
            title="输入qq邮箱仅用于获取头像和昵称"
            type="warning"
            :closable="false"
            show-icon
          >
          </el-alert>
        </div>
        <el-input v-model="email" placeholder="请输入qq邮箱"></el-input>
        <div class="options">
          <el-button type="primary" plain @click="postComments"
            >发表留言</el-button
          >
        </div>
        <el-divider></el-divider>
        <div class="title">最新留言<i class="el-icon-edit"></i></div>
        <div class="comment-list">
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="item.comment_id"
          >
            <div class="flex-content">
              <div class="label">
                <el-tag size="mini" v-if="item.v_id === 10">博主</el-tag>
                <el-avatar
                  shape="square"
                  :src="item.Visitor.avatar"
                ></el-avatar>
                <div class="name">{{ item.Visitor.nickname }}</div>
              </div>
              <div class="content">
                <div class="value">{{ item.content }}</div>
                <div class="option">
                  <div class="time">{{ item.createdAt }}</div>
                  <div class="btn_reply">
                    <div class="reply_btn" @click="showReplys(index, item)">
                      {{ reply }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="reply"
              v-if="currentReplyIndex === index"
              style="padding-left:80px;"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入回复内容"
                v-model="content"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
              <el-input v-model="email" placeholder="请输入qq邮箱"></el-input>
              <div class="options">
                <el-button type="primary" plain @click="toReplys"
                  >回复</el-button
                >
              </div>
            </div>
            <div class="child-reply" style="padding-left:80px;">
              <div
                class="reply-item"
                v-for="(child, index2) in item.children"
                :key="index2"
              >
                <div class="child-top">
                  <div class="child-label">
                    <div class="from">
                      <el-tag size="mini" v-if="child.v_id === 10">博主</el-tag>
                      <el-avatar
                        shape="square"
                        size="medium"
                        :src="child.Visitor.avatar"
                      ></el-avatar>
                      <div class="name">{{ child.Visitor.nickname }}</div>
                    </div>
                    <div v-if="child.to_id !== 0">@</div>
                    <div class="from" v-if="child.to_id !== 0">
                      <el-tag size="mini" v-if="child.to_id === 10"
                        >博主</el-tag
                      >
                      <el-avatar
                        shape="square"
                        size="medium"
                        :src="child.to.avatar"
                      ></el-avatar>
                      <div class="name">{{ child.to.nickname }}</div>
                    </div>
                  </div>
                  <div class="child-content">
                    <div class="value">{{ child.content }}</div>
                    <div class="option">
                      <div class="time">{{ child.createdAt }}</div>
                      <div class="btn_reply">
                        <div
                          class="reply_btn"
                          @click="showChildReply(index, index2, item, child)"
                        >
                          {{ reply }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="reply"
                  v-if="
                    pReplyIndex === index && currentChildReplyIndex === index2
                  "
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入回复内容"
                    v-model="content"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></el-input>
                  <el-input
                    v-model="email"
                    placeholder="请输入qq邮箱"
                  ></el-input>
                  <div class="options">
                    <el-button type="primary" plain @click="toChildReplys"
                      >回复</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Comment",
  data() {
    return {
      content: "",
      qq: "",
      avatar: "",
      nickname: "",
      email: "",
      v_id: "",
      to_id: "",
      visitor: {},
      commentList: [],
      currentReplyIndex: -1,
      currentChildReplyIndex: -1,
      pReplyIndex: -1,
      p_id: null,
      f_id: null,
      replyForm: {
        from_id: "",
        to_id: "",
        reply_content: "",
        CommentCommentId: ""
      },
      to_email: "",
      reply: "回复"
    };
  },
  props: ["articleId"],
  methods: {
    async postComment() {
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
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.content === "") {
            this.$message.error("留言内容不能为空");
          } else {
            this.commitComment();
          }
        }
      }
    },
    //发表评论
    async postComments() {
      this.qq = new RegExp(`[1-9][0-9]{4,}`).exec(this.email);
      if (this.qq) {
        //用户头像
        this.avatar = "http://q1.qlogo.cn/g?b=qq&nk=" + this.qq + "&s=100";
        const data = await this.http.get(
          "http://api.btstu.cn/qqxt/api.php?qq=" + this.qq
        );
        this.nickName = data.data.name; //用户昵称
        //用户标识信息
        this.visitor = {
          nickname: this.nickName,
          email: this.email,
          avatar: this.avatar
        };
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.content === "") {
            this.$message.error("留言内容不能为空");
          } else {
            this.commitComments(null, null, null);
          }
        }
      }
    },
    // 显示回复框
    showReply(index, item) {
      if (this.currentReplyIndex === index) {
        this.currentReplyIndex = "";
      } else {
        this.currentReplyIndex = index;
      }
      console.log(item);
      this.replyForm.to_id = null;
      this.replyForm.CommentCommentId = item.comment_id;
    },
    showReplys(index, item) {
      this.currentChildReplyIndex = "";
      if (this.currentReplyIndex === index) {
        this.currentReplyIndex = "";
      } else {
        this.currentReplyIndex = index;
      }
      console.log(item);
      this.p_id = item.id;
      this.to_email = item.Visitor.email;
      this.f_id = item.id;
    },
    //显示子回复框
    showChildReply(pIndex, index, item, child) {
      this.p_id = item.id;
      this.currentReplyIndex = "";
      if (this.currentChildReplyIndex === index && this.pReplyIndex == pIndex) {
        this.currentChildReplyIndex = "";
      } else {
        this.currentChildReplyIndex = index;
        this.pReplyIndex = pIndex;
      }
      console.log(item);
      console.log(child);
      this.to_id = child.v_id;
      this.p_id = item.id;
      this.f_id = child.id;
    },
    async commitComments(p_id, to_id, f_id) {
      let Comment = {
        content: this.content,
        v_id: this.v_id,
        parentId: p_id,
        articleId: this.articleId === undefined ? 0 : this.articleId,
        to_id: to_id,
        p_id: f_id
      };
      const { data: res } = await this.http.post(
        "comments/insertcomments",
        Comment
      );
      if (res.meta.status === 200) {
        this.$message.success("留言成功");
        this.content = "";
        this.getComments();
      } else {
        this.$message.error("留言失败");
      }
      console.log(res);
    },
    //添加评论
    async commitComment() {
      let Comment = {
        content: this.content, //评论内容
        VisitorVId: this.v_id //用户id
      };
      const { data: res } = await this.http.post(
        "comment/insertcomment",
        Comment
      );
      if (res.meta.status === 200) {
        this.$message.success("留言成功");
        this.content = "";
        this.getComment();
      } else {
        this.$message.error("留言失败");
      }
      console.log(res);
    },
    //回复子评论
    async toChildReply() {
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
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          this.replyForm.from_id = this.v_id;
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.replyForm.reply_content === "") {
            this.$message.error("回复内容不能为空");
          } else {
            console.log(this.replyForm);
            if (this.replyForm.reply_content) {
              const { data: res } = await this.http.post(
                "reply/insertreply",
                this.replyForm
              );
              if (res.meta.status === 200) {
                this.$message.success("回复成功");
                this.currentChildReplyIndex = "";
                this.getComment();
              } else {
                this.$message.error("回复失败");
                this.currentChildReplyIndex = "";
              }
            }
          }
        }
      }
    },
    //回复子评论
    async toChildReplys() {
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
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.content === "") {
            this.$message.error("回复内容不能为空");
          } else {
            if (this.content) {
              this.commitComments(this.p_id, this.to_id, this.f_id);
            }
          }
        }
      }
    },
    //获取留言
    async getComment() {
      const { data: res } = await this.http("comment/getcomment");
      this.commentList = res.data.rows;
      console.log(res);
    },
    //获取留言
    async getComments() {
      console.log(this.articleId);
      const { data: res } = await this.http.get("comments/getcomments", {
        params: {
          articleId: this.articleId === undefined ? 0 : this.articleId
        }
      });
      this.commentList = res.data.rows;
      console.log(res.data.rows);
    },
    // 评论回复
    async toReply() {
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
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          this.replyForm.from_id = this.v_id;
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.replyForm.reply_content === "") {
            this.$message.error("留言内容不能为空");
          } else {
            console.log(this.replyForm);
            if (this.replyForm.reply_content) {
              const { data: res } = await this.http.post(
                "reply/insertreply",
                this.replyForm
              );
              if (res.meta.status === 200) {
                this.$message.success("留言成功");
                this.currentReplyIndex = "";
                this.getComment();
              } else {
                this.$message.error("回复失败");
                this.currentReplyIndex = "";
              }
            }
          }
        }
      }
    },
    async toReplys() {
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
        const { data: res } = await this.http.post(
          "visitor/insertvisitor",
          this.visitor
        );
        if (res.meta.status === 200) {
          this.visitor.v_id = res.data.v_id;
          this.v_id = res.data.v_id;
          this.replyForm.from_id = this.v_id;
          console.log("email:" + this.to_email);
          window.localStorage.setItem("visitor", JSON.stringify(this.visitor));
          if (this.content === "") {
            this.$message.error("留言内容不能为空");
          } else {
            this.commitComments(this.p_id, 0, this.f_id);
          }
        }
      }
    }
    // // 嵌套评论
    // function loadComment(){

    // }
  },
  created() {
    if (window.localStorage.getItem("visitor") !== null) {
      this.email = JSON.parse(window.localStorage.getItem("visitor")).email;
      this.v_id = JSON.parse(window.localStorage.getItem("visitor")).v_id;
    }
    // this.getComment();
    this.getComments();
  }
};
</script>
<style lang="less" scoped>
#message {
  height: 100%;
  background: #fff;
  padding: 15px;
  margin: 10px;
  .name {
    font-size: 14px;
    color: blueviolet;
    font-weight: bold;
  }
  .reply_btn {
    font-size: 12px;
    &:hover {
      color: #409eff;
    }
  }
  .time {
    margin-right: 10px;
    font-size: 12px;
    color: #ccc;
  }
  .header {
    margin-bottom: 10px;
  }
  .userform {
    margin: 10px 0;
    .tip {
      margin-bottom: 10px;
    }
  }
  .options {
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
  .content-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .flex-content {
    display: flex;
    align-items: center;
    flex-direction: row;
    .content {
      .option {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    // justify-content: flex-start;
    .label {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        font-size: 14px;
        color: blueviolet;
        font-weight: bold;
      }
    }
  }
  .child-top {
    display: flex;
    align-items: center;
    .child-label {
      display: flex;
      justify-content: center;
      align-items: center;
      .from {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      .to {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
    }
    .child-content {
      display: flex;
      flex-direction: column;
      .option {
        display: flex;
        .time {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
