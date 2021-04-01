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
            v-for="item in commentList"
            :key="item.comment_id"
          >
            <div class="label">
              <el-avatar shape="square" :src="item.Visitor.avatar"></el-avatar>
              <div class="name">{{ item.Visitor.nickname }}</div>
            </div>
            <div class="content">
              <div class="value">{{ item.content }}</div>
            </div>
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
      commentList: []
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
          this.commitComment();
        }
      }
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
      } else {
        this.$message.error("留言失败");
      }
      console.log(res);
    },
    //获取留言
    async getComment() {
      const { data: res } = await this.http(
        "http://127.0.0.1:3000/comment/getcomment"
      );
      this.commentList = res.data.rows;
      console.log(res);
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
  .comment-item {
    display: flex;
    align-items: center;
    .label {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
