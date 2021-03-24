<template>
  <div class="manage-article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="article-manage">
      <!-- 表格渲染数据 -->
      <div class="show-data">
        <el-table
          :data="articleList"
          style="width: 100%"
          align="center"
          :header-cell-style="{ background: 'skyblue', color: '#fff' }"
        >
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="Sort.sort_name" label="分类"></el-table-column>
          <el-table-column
            prop="Comments.length"
            label="评论数"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建日期"
          ></el-table-column>
          <el-table-column prop="update_time" label="最近更新">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editArticle(scope.row.id)"
                >编辑</el-button
              >
              <el-popconfirm
                title="是否删除该分类？"
                @confirm="articlepopConfirm(scope.row.id)"
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
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="4"
            layout="total,sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "articleManage",
  data() {
    return {
      articleList: [],
      currentPage: 1,
      pageSize: 4,
      total: 0
    };
  },
  filters: {},
  methods: {
    async getAllArticles() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/getarticle"
      );
      console.log(res);
      this.articleList = res.data;
      this.articleList = JSON.parse(this.articleList);
      this.total = this.articleList.length;
      console.log(this.articleList);
    },
    articlepopCancel() {
      this.message.success("取消删除");
    },
    async articlepopConfirm(id) {
      const { data: res } = await this.http.delete(
        "http://127.0.0.1:3000/article/deletearticle?id=" + id
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.getAllArticles();
        this.$message.success("成功删除");
      } else {
        this.$message.error("删除失败");
      }
    },
    editArticle(id) {
      console.log(id);
      this.$router.push({ name: "WriteArticle", params: { id: id } });
    },
    async handleSizeChange(count) {
      this.pageSize = count;
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/getarticle/",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.articleList = res.data;
      this.articleList = JSON.parse(this.articleList);
      console.log(this.articleList);
    },
    async handleCurrentChange(pageCount) {
      this.currentPage = pageCount;
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/getarticle/",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.articleList = res.data;
      this.articleList = JSON.parse(this.articleList);
      console.log(this.articleList);
    },
    deleteArticle(id) {
      console.log(id);
    },
    cancelDelete() {}
  },
  created() {
    this.getAllArticles();
  }
};
</script>
<style lang="less">
.manage-article {
  padding: 20px;
  .article-manage {
    margin-top: 20px;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
