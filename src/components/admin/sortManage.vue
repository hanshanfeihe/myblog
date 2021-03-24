<template>
  <div id="sort_manage">
    <!-- 面包屑title -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 新增分类 -->
    <div class="options">
      <el-button icon="el-icon-plus" type="success" @click="showDialog"
        >新增分类</el-button
      >
    </div>
    <!-- 表格渲染数据 -->
    <div class="show-data">
      <el-table
        :data="sortList"
        style="width: 100%"
        align="center"
        :header-cell-style="{ background: 'skyblue', color: '#fff' }"
      >
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="sort_name" label="名称"> </el-table-column>
        <el-table-column prop="createdAt" label="创建日期"> </el-table-column>
        <el-table-column prop="Articles.length" label="文章数" width="80">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="是否删除该分类？"
              @confirm="deleteSort(scope.row.sort_id)"
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
    <!--编辑分类对话框 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="editdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="sortForm"
        ref="ruleForm"
        label-width="100px"
        :rules="editRules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="分类名称" prop="sort_name">
          <el-input v-model="sortForm.sort_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSortForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增分类对话框 -->
    <el-dialog
      title="新增分类"
      :visible.sync="addSortDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addSortForm"
        ref="ruleForm"
        label-width="100px"
        :rules="editRules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="分类名称" prop="sort_name">
          <el-input v-model="addSortForm.sort_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postSortForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "SortManage",
  data() {
    return {
      // 分类列表
      sortList: [],
      editdialogVisible: false,
      addSortDialogVisible: false,
      pageSize: 4,
      currentPage: 1,
      total: null,
      sortForm: {
        sort_id: "",
        sort_name: ""
      },
      addSortForm: {
        sort_name: ""
      },
      editRules: {
        sort_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取分类列表数据
    async getAllSorts() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/sort/getsortlists"
      );
      console.log(res);
      this.sortList = res.data;
      this.sortList = JSON.parse(this.sortList);
      this.total = JSON.parse(res.data).length;
      console.log(this.total);
      console.log(this.sortList);
    },
    handleEdit(index, item) {
      this.editdialogVisible = true;
      this.sortForm.sort_name = item.sort_name;
      this.sortForm.sort_id = item.sort_id;
      console.log(index);
      console.log(item);
    },
    handleDelete() {},
    handleClose() {
      this.addSortDialogVisible = false;
      this.editdialogVisible = false;
    },
    async updateSortForm() {
      const { data: res } = await this.http.put(
        "http://127.0.0.1:3000/sort/updatesort",
        this.sortForm
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message({
          message: "更新分类成功",
          type: "success"
        });
      } else {
        this.$message.error("更新失败");
      }
      this.editdialogVisible = false;
      this.getAllSorts();
    },
    //删除分类
    async deleteSort(id) {
      const { data: res } = await this.http.delete(
        "http://127.0.0.1:3000/sort/deletesort?id=" + id
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message({
          message: "成功删除",
          type: "success"
        });
        this.getAllSorts();
      } else {
        this.$message.error("删除失败");
      }
    },
    cancelDelete() {
      this.$message({
        message: "取消删除",
        type: "warning"
      });
    },
    showDialog() {
      this.addSortDialogVisible = true;
    },
    async postSortForm() {
      const { data: res } = await this.http.post(
        "http://127.0.0.1:3000/sort/insertsort",
        this.addSortForm
      );
      if (res.meta.status === 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.addSortDialogVisible = false;
        this.getAllSorts();
      } else {
        this.$message.error("添加失败");
      }
    },
    async handleSizeChange(count) {
      this.pageSize = count;
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/sort/getsortlists/",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.sortList = res.data;
      this.sortList = JSON.parse(this.sortList);
      console.log(this.sortList);
    },
    async handleCurrentChange(pageCount) {
      this.currentPage = pageCount;
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/sort/getsortlists/",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.sortList = res.data;
      this.sortList = JSON.parse(this.sortList);
    }
  },
  created() {
    this.getAllSorts();
  }
};
</script>
<style lang="less">
#sort_manage {
  .options {
    margin-top: 10px;
  }
  .show-data {
    margin-top: 10px;
    .pagination {
      margin-top: 10px;
    }
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }
  .el-button {
    margin-right: 10px;
  }
}
</style>
