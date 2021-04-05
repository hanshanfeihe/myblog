<template>
  <div id="comment-manage">
    <!-- 面包屑title -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="select" style="margin:10px 0">
      <el-select
        v-model="id"
        placeholder="请选择所在页面"
        filterable
        clearable
        @change="checkCommentList"
      >
        <el-option
          v-for="item in blogList"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="table">
      <el-table
        :data="parent"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Visitor.createdAt"
          label="日期"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column label="昵称" width="60" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.Visitor.nickname }}</div>
            <el-tag size="mini" v-if="scope.row.v_id === 10">我</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="Visitor.email"
          label="邮箱"
          width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="头像" width="80" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.Visitor.avatar"
              alt=""
              style="width:60px;height:60px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="150"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="所在页面"
          width="180"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <a href="" v-if="scope.row.articleId === 0">留言墙</a>
            <a href="" v-else>{{ scope.row.Article.title }}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >回复</el-button
            >
            <el-popconfirm
              title="是否删除该评论？"
              @confirm="toDelete(scope.row)"
              @cancel="cancelDelete"
            >
              <el-button
                size="mini"
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--编辑分类对话框 -->
      <el-dialog
        title="编辑分类"
        :visible.sync="editdialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          ref="ruleForm"
          :model="comment"
          label-width="100px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="评论内容">
            <el-input
              type="textarea"
              v-model="comment.content"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input type="text" v-model="nickname" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input type="text" v-model="email" disabled></el-input>
          </el-form-item>
          <el-form-item label="回复内容">
            <el-input type="textarea" v-model="reply"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toReply">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 20, 30, 40]"
      :page-size="count"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(total)"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "comment_manage",
  data() {
    return {
      id: "", //页面id
      commentsList: [],
      blogList: [],
      parent: [],
      child: [],
      editdialogVisible: false,
      nickname: "",
      email: "",
      reply: "",
      v_id: "",
      parentId: "",
      articleId: "",
      to_id: "",
      p_id: "",
      total: "",
      flag: true,
      ruleForm() {},
      editRules() {},
      comment: {},
      page: 1,
      count: 10
    };
  },
  methods: {
    handleSizeChange(size) {
      this.count = size;
      this.getAllComment();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getAllComment();
    },
    handleEdit(comment) {
      this.comment = comment;
      this.nickname = this.comment.Visitor.nickname;
      this.email = this.comment.Visitor.email;
      this.editdialogVisible = true;
      if (!this.comment.parentId) {
        this.parentId = this.comment.id;
      } else {
        this.parentId = this.comment.parentId;
      }
      this.articleId = this.comment.articleId;
      this.to_id = this.comment.v_id;
      this.p_id = this.comment.id;
    },
    handleDelete() {},
    toDelete(comment) {
      this.deleteCommentById(comment.id);
      if (comment.children) {
        this.deleteComment(comment);
      }
      if (this.flag === true) {
        this.$message.success("删除成功");
        this.getAllComment();
      } else {
        this.$$message.error("删除失败");
        this.getAllComment();
      }
    },
    deleteComment(comment) {
      if (comment.children) {
        for (let i = 0; i < comment.children.length; i++) {
          this.deleteComment(comment.children[i]);
          this.deleteCommentById(comment.children[i].id);
        }
      }
    },
    //切换页面
    checkCommentList() {
      this.page = 1;
      this.count = 10;
      this.getAllComment();
    },
    async deleteCommentById(id) {
      const { data: res } = await this.http.delete(
        "http://127.0.0.1:3000/comments/deletecommentsbyid",
        {
          params: {
            id: id
          }
        }
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    async toReply() {
      let Comment = {
        content: this.reply,
        v_id: 10,
        parentId: this.parentId,
        articleId: this.articleId,
        to_id: this.to_id,
        p_id: this.p_id
      };
      const { data: res } = await this.http.post(
        "http://127.0.0.1:3000/comments/insertcomments",
        Comment
      );
      if (res.meta.status === 200) {
        this.$message.success("回复成功");
        this.content = "";
        this.editdialogVisible = false;
        // this.getAllComment();
      } else {
        this.editdialogVisible = false;
        this.$message.error("回复失败");
      }
      console.log(res);
    },
    cancelDelete() {},
    handleClose() {
      this.editdialogVisible = false;
    },
    // 获取所有评论
    async getAllComment() {
      (this.parent = []), (this.child = []);
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/comments/getallcomments",
        {
          params: {
            articleId: this.id,
            count: this.count,
            page: this.page
          }
        }
      );
      // console.log(res.data.rows);
      this.commentsList = res.data.rows;
      this.commentsList.map(item => {
        if (item.parentId == null) {
          this.parent.push(item);
        } else {
          this.child.push(item);
        }
      });
      this.child.map(item => {
        this.parent = this.insertNode(this.parent, item);
      });
      console.log(this.parent);
      this.total = this.parent.length;
      // console.log(this.child);
    },
    insertNode(data, node) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === node.p_id) {
          if (!data[i].children) {
            data[i].children = [];
          }
          data[i].children.push(node);
          return data;
        }
        if (data[i].children) {
          data[i].children = this.insertNode(data[i].children, node);
        }
      }
      return data;
    },
    //获取所有页面标题和id
    async getBlogList() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/getbloglist"
      );
      // console.log(res.data);
      this.blogList = res.data;
      this.blogList.unshift({
        id: 0,
        title: "留言墙"
      });
      console.log(this.blogList);
    }
  },
  created() {
    this.getAllComment();
    this.getBlogList();
  }
};
</script>
<style lang="less" scoped>
#comment-manage {
  padding: 20px;
  .table {
    margin: 10px 0;
  }
}
</style>
