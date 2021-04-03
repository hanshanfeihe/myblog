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
          <el-button type="primary" plain @click="postComment"
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
                    <div class="reply_btn" @click="showReply(index, item)">
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
                placeholder="请输入留言内容"
                v-model="replyForm.reply_content"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
              <el-input v-model="email" placeholder="请输入qq邮箱"></el-input>
              <div class="options">
                <el-button type="primary" plain @click="toReply"
                  >回复</el-button
                >
              </div>
            </div>
            <div class="child-reply" style="padding-left:80px;">
              <div
                class="reply-item"
                v-for="(child, index2) in item.Replies"
                :key="index2"
              >
                <div class="child-top">
                  <div class="child-label">
                    <div class="from">
                      <el-avatar
                        shape="square"
                        size="medium"
                        :src="child.from.avatar"
                      ></el-avatar>
                      <div class="name">{{ child.from.nickname }}</div>
                    </div>
                    <div class="text" v-if="child.to !== null">回复</div>
                    <div class="to from" v-if="child.to !== null">
                      <el-avatar
                        shape="square"
                        size="medium"
                        :src="child.to.avatar"
                      ></el-avatar>
                      <div class="name">{{ child.to.nickname }}</div>
                    </div>
                  </div>
                  <div class="child-content">
                    <div class="value">{{ child.reply_content }}</div>
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
                    placeholder="请输入留言内容"
                    v-model="replyForm.reply_content"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></el-input>
                  <el-input
                    v-model="email"
                    placeholder="请输入qq邮箱"
                  ></el-input>
                  <div class="options">
                    <el-button type="primary" plain @click="toChildReply"
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
      visitor: {},
      commentList: [],
      currentReplyIndex: -1,
      currentChildReplyIndex: -1,
      pReplyIndex: -1,
      replyForm: {
        from_id: "",
        to_id: "",
        reply_content: "",
        CommentCommentId: ""
      },
      reply: "回复"
    };
  },
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
          "http://127.0.0.1:3000/visitor/insertvisitor",
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
    //显示子回复框
    showChildReply(pIndex, index, item, child) {
      this.pReplyIndex = pIndex;
      if (this.currentChildReplyIndex === index) {
        this.currentChildReplyIndex = "";
      } else {
        this.currentChildReplyIndex = index;
      }
      console.log(item);
      console.log(child);
      this.replyForm.to_id = child.from_id;
      this.replyForm.CommentCommentId = item.comment_id;
    },
    async commitComment() {
      let Comment = {
        content: this.content,
        VisitorVId: this.v_id
      };
      const { data: res } = await this.http.post(
        "http://127.0.0.1:3000/comment/insertcomment",
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
          "http://127.0.0.1:3000/visitor/insertvisitor",
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
                "http://127.0.0.1:3000/reply/insertreply",
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
    //获取留言
    async getComment() {
      const { data: res } = await this.http(
        "http://127.0.0.1:3000/comment/getcomment"
      );
      this.commentList = res.data.rows;
      console.log(res);
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
          "http://127.0.0.1:3000/visitor/insertvisitor",
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
                "http://127.0.0.1:3000/reply/insertreply",
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
    }
  },
  created() {
    if (window.localStorage.getItem("visitor") !== null) {
      this.email = JSON.parse(window.localStorage.getItem("visitor")).email;
      this.v_id = JSON.parse(window.localStorage.getItem("visitor")).v_id;
    }
    this.getComment();
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
