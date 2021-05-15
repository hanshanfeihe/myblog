<template>
  <div id="sort_manage">
    <!-- 面包屑title -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
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
        :data="tagList"
        style="width: 100%"
        align="center"
        :header-cell-style="{ background: 'skyblue', color: '#fff' }"
      >
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="tag_name" label="名称"> </el-table-column>
        <el-table-column prop="createdAt" label="创建日期"> </el-table-column>
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
              @confirm="deleteTag(scope.row.tag_id)"
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
      title="编辑标签"
      :visible.sync="editdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="tagForm"
        ref="ruleForm"
        label-width="100px"
        :rules="editRules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="标签名称" prop="tag_name">
          <el-input v-model="tagForm.tag_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSortForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增分类对话框 -->
    <el-dialog
      title="新增标签"
      :visible.sync="addTagDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addTagForm"
        ref="ruleForm"
        label-width="100px"
        :rules="editRules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="标签名称" prop="tag_name">
          <el-input v-model="addTagForm.tag_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postTagForm">确 定</el-button>
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
      tagList: [],
      editdialogVisible: false,
      addTagDialogVisible: false,
      pageSize: 4,
      currentPage: 1,
      total: null,
      tagForm: {
        tag_id: "",
        tag_name: ""
      },
      addTagForm: {
        tag_name: ""
      },
      editRules: {
        tag_name: [
          { required: true, message: "请输入标签名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取分类列表数据
    async getAllTags() {
      const { data: res } = await this.http.get(
        "tag/gettaglists"
      );
      console.log(res);
      this.tagList = JSON.parse(res.data);
      this.total = JSON.parse(res.data).length;
    },
    handleEdit(index, item) {
      this.editdialogVisible = true;
      this.tagForm.tag_name = item.tag_name;
      this.tagForm.tag_id = item.tag_id;
      console.log(index);
      console.log(item);
    },
    handleDelete() {},
    handleClose() {
      this.addSortDialogVisible = false;
      this.editdialogVisible = false;
    },
    //更新标签
    async updateSortForm() {
      const { data: res } = await this.http.put(
        "tag/updatetag",
        this.tagForm
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message({
          message: "更新标签成功",
          type: "success"
        });
      } else {
        this.$message.error("更新失败");
      }
      this.editdialogVisible = false;
      this.getAllTags();
    },
    //删除标签
    async deleteTag(id) {
      const { data: res } = await this.http.delete(
        "tag/deletetag?id=" + id
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message({
          message: "成功删除",
          type: "success"
        });
        this.getAllTags();
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
      this.addTagDialogVisible = true;
    },
    //添加标签
    async postTagForm() {
      const { data: res } = await this.http.post(
        "tag/inserttag",
        this.addTagForm
      );
      if (res.meta.status === 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.addTagDialogVisible = false;
        this.getAllTags();
      } else {
        this.$message.error("添加失败");
      }
    },
    async handleSizeChange(count) {
      this.pageSize = count;
      const { data: res } = await this.http.get(
        "tag/gettaglists",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.tagList = JSON.parse(res.data);
    },
    async handleCurrentChange(pageCount) {
      this.currentPage = pageCount;
      const { data: res } = await this.http.get(
        "tag/gettaglists",
        {
          params: {
            count: this.pageSize,
            page: this.currentPage
          }
        }
      );
      this.tagList = JSON.parse(res.data);
    }
  },
  created() {
    this.getAllTags(); //获取所有标签
  }
};
</script>
<style lang="less">
#sort_manage {
  padding: 20px;
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
