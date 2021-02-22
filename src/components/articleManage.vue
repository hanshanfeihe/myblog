<template>
  <div class="manage">
    <div class="manage-header">
      文章管理
    </div>
    <div class="article-manage">
      <my-table :columns="propData" :data="articleList">
        <template slot="option" slot-scope="rowData">
          <my-button
            type="primary"
            btnValue="编辑"
            small
            @click="editArticle(rowData.row.id)"
          ></my-button>
          <my-popconfirm
            @confirm="articlepopConfirm(rowData.row.id)"
            @cancel="articlepopCancel"
          >
            <my-button type="danger" btnValue="删除" small></my-button>
          </my-popconfirm>
        </template>
      </my-table>
    </div>
    <div class="manage-header">
      分类管理
    </div>
    <div class="op">
      <my-button
        btnValue="新增分类"
        type="primary"
        @click="addSort"
      ></my-button>
      <div class="search">
        <input
          type="text"
          v-model="search_sort_name"
          style="width:300px;height:35px;padding-left:10px;background-color:#ccc;"
        />
        <my-button
          btnValue="查找分类"
          type="primary"
          @click="searchSort"
        ></my-button>
      </div>
    </div>
    <my-table :columns="sortSetting" :data="sortList">
      <template slot="option" slot-scope="rowData">
        <my-button
          type="primary"
          btnValue="编辑"
          small
          @click="editSort(rowData.row)"
        ></my-button>
        <my-popconfirm
          @confirm="popConfirm(rowData.row.sort_id)"
          @cancel="popCancel"
        >
          <my-button type="danger" btnValue="删除" small></my-button>
        </my-popconfirm>
      </template>
    </my-table>
    <!-- 分类对话框 -->
    <my-modal
      :isOpen="sortDialogVisible"
      @cancel="cancel_update"
      @confirm="updateSortForm"
      title="编辑分类"
    >
      <label for="sort-name">分类名称:</label>
      <input type="text" v-model="update_SortForm.sort_name" />
    </my-modal>
    <my-modal
      :isOpen="newSortDialogVisible"
      @cancel="cancel_new"
      @confirm="sentSortForm"
      title="新增分类"
    >
      <label for="sort-name">分类名称:</label>
      <input type="text" v-model="new_sort_name" />
    </my-modal>
    <div class="manage-header">
      标签管理
    </div>
    <div class="op">
      <my-button btnValue="新增标签" type="primary" @click="addTag"></my-button>
      <div class="search">
        <input
          type="text"
          v-model="search_tag_name"
          style="width:300px;height:35px;padding-left:10px;background-color:#ccc;"
        />
        <my-button
          btnValue="查找标签"
          type="primary"
          @click="searchTag"
        ></my-button>
      </div>
    </div>
    <my-table :columns="tagSetting" :data="tagList">
      <template slot="option" slot-scope="rowData">
        <my-button
          type="primary"
          btnValue="编辑"
          small
          @click="editTag(rowData.row)"
        ></my-button>
        <my-popconfirm
          @confirm="tag_popConfirm(rowData.row.tag_id)"
          @cancel="tag_popCancel"
        >
          <my-button type="danger" btnValue="删除" small></my-button>
        </my-popconfirm>
      </template>
    </my-table>
    <my-modal
      :isOpen="newTagDialogVisible"
      @cancel="cancel_tag_new"
      @confirm="sentTagForm"
      title="新增标签"
    >
      <label for="sort-name">标签名称:</label>
      <input type="text" v-model="new_tag_name" />
    </my-modal>
    <my-modal
      :isOpen="tagDialogVisible"
      @cancel="tag_cancel_update"
      @confirm="updateTagForm"
      title="编辑标签"
    >
      <label for="tag-name">标签名称:</label>
      <input type="text" v-model="update_TagForm.tag_name" />
    </my-modal>
  </div>
</template>
<script>
import MyTable from '../components/my-table/index.vue'
import myButton from '../components/my-button/index.vue'
import myModal from '../components/my-modal/index.vue'
import myPopconfirm from '../components/my-popconfirm/index.vue'
export default {
  name: 'articleManage',
  components: {
    MyTable,
    myButton,
    myModal,
    myPopconfirm
  },
  data() {
    return {
      articleList: [],
      sortList: [],
      tagList: [],
      search_sort_name: '',
      search_tag_name: '',
      sortDialogVisible: false,
      tagDialogVisible: false,
      newSortDialogVisible: false,
      newTagDialogVisible: false,
      title: ['id', '名称', '日期', '分类'],
      new_sort_name: '',
      new_tag_name: '',
      update_SortForm: {
        sort_id: '',
        sort_name: ''
      },
      update_TagForm: {
        tag_id: '',
        tag_name: ''
      },
      propData: [
        {
          title: 'id',
          width: '150',
          key: 'id'
        },
        {
          title: '名称',
          width: '350',
          key: 'title'
        },
        {
          title: '日期',
          width: '350',
          key: 'create_time'
        },
        {
          title: '分类',
          width: '250',
          key: 'sort_id'
        },
        {
          title: '操作',
          width: '250',
          slotName: 'option'
        }
      ],
      sortSetting: [
        {
          title: 'id',
          width: '150',
          key: 'sort_id'
        },
        {
          title: '分类名称',
          width: '300',
          key: 'sort_name'
        },
        {
          title: '创建时间',
          width: '200',
          key: 'createdAt'
        },
        {
          title: '操作',
          width: '300',
          slotName: 'option'
        }
      ],
      tagSetting: [
        {
          title: 'id',
          width: '150',
          key: 'tag_id'
        },
        {
          title: '标签名称',
          width: '300',
          key: 'tag_name'
        },
        {
          title: '创建时间',
          width: '200',
          key: 'createdAt'
        },
        {
          title: '操作',
          width: '300',
          slotName: 'option'
        }
      ]
    }
  },
  methods: {
    async getAllArticles() {
      const { data: res } = await this.http.get(
        'http://127.0.0.1:3000/article/getarticle'
      )
      console.log(res)
      this.articleList = res.data
      this.articleList = JSON.parse(this.articleList)
      console.log(this.articleList)
    },
    async getAllSorts() {
      const { data: res } = await this.http.get(
        'http://127.0.0.1:3000/sort/getsortlists'
      )
      console.log(res)
      this.sortList = res.data
      this.sortList = JSON.parse(this.sortList)
      console.log(this.sortList)
    },
    async getAllTags() {
      const { data: res } = await this.http.get(
        'http://127.0.0.1:3000/tag/gettaglists'
      )
      console.log(res)
      this.tagList = res.data
      this.tagList = JSON.parse(this.tagList)
      console.log(this.tagList)
    },
    editArticle(id) {
      console.log(id)
    },
    editSort(item) {
      this.update_SortForm.sort_name = item.sort_name
      this.update_SortForm.sort_id = item.sort_id
      console.log(this.update_SortForm)
      this.sortDialogVisible = true
    },
    editTag(item) {
      this.update_TagForm.tag_name = item.tag_name
      this.update_TagForm.tag_id = item.tag_id
      this.tagDialogVisible = true
    },
    addSort() {
      this.newSortDialogVisible = true
    },
    addTag() {
      this.newTagDialogVisible = true
    },
    cancel_update() {
      this.sort_name = ''
      this.sortDialogVisible = false
    },
    tag_cancel_update() {
      this.tag_name = ''
      this.tagDialogVisible = false
    },
    cancel_new() {
      this.new_sort_name = ''
      this.newSortDialogVisible = false
    },
    cancel_tag_new() {
      this.new_tag_name = ''
      this.newTagDialogVisible = false
    },
    async sentTagForm() {
      if (this.new_tag_name) {
        const { data: res } = await this.http.post(
          'http://127.0.0.1:3000/tag/inserttag',
          {
            tag_name: this.new_tag_name
          }
        )
        if (res.meta.status === 200) {
          this.newTagDialogVisible = false
          this.new_tag_name = ''
          this.message.success('添加成功')
          this.getAllTags()
        }
      }
    },
    async sentSortForm() {
      if (this.new_sort_name) {
        const { data: res } = await this.http.post(
          'http://127.0.0.1:3000/sort/insertsort',
          {
            sort_name: this.new_sort_name
          }
        )
        console.log(res.meta.status)
        console.log(typeof res.meta.status)
        if (res.meta.status === 200) {
          this.newSortDialogVisible = false
          this.new_sort_name = ''
          this.message.success('添加成功')
          this.getAllSorts()
        }
      }
    },
    async updateSortForm() {
      console.log(this.update_SortForm)
      const { data: res } = await this.http.put(
        'http://127.0.0.1:3000/sort/updatesort',
        this.update_SortForm
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.sortDialogVisible = false
        this.getAllSorts()
        this.message.success('更新成功')
      }
    },
    async updateTagForm() {
      console.log(this.update_TagForm)
      const { data: res } = await this.http.put(
        'http://127.0.0.1:3000/tag/updatetag',
        this.update_TagForm
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.tagDialogVisible = false
        this.getAllTags()
        this.message.success('更新成功')
      }
    },
    async articlepopConfirm(id) {
      const { data: res } = await this.http.delete(
        'http://127.0.0.1:3000/article/deletearticle?id=' + id
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.getAllArticles()
        this.message.success('成功删除')
      } else {
        this.message.error('删除失败')
      }
    },
    async popConfirm(id) {
      const { data: res } = await this.http.delete(
        'http://127.0.0.1:3000/sort/deletesort?id=' + id
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.getAllSorts()
        this.message.success('成功删除')
      } else {
        this.message.error('删除失败')
      }
    },
    async tag_popConfirm(id) {
      const { data: res } = await this.http.delete(
        'http://127.0.0.1:3000/tag/deletetag?id=' + id
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.getAllTags()
        this.message.success('成功删除')
      } else {
        this.message.error('删除失败')
      }
    },
    articlepopCancel() {
      this.message.success('取消删除')
    },
    popCancel() {
      this.message.success('取消删除')
    },
    tag_popCancel() {
      this.message.success('取消删除')
    },
    async searchSort() {
      if (this.search_sort_name) {
        const { data: res } = await this.http.get(
          'http://127.0.0.1:3000/sort/getsortbyname?sort_name=' +
            this.search_sort_name
        )
        console.log(res)
        if (res.meta.status === 200) {
          if (JSON.parse(res.data).length !== 0) {
            this.message.success('查找成功')
            this.sortList = JSON.parse(res.data)
          } else {
            this.message.error('查无此记录')
          }
        }
      }
    },
    async searchTag() {
      if (this.search_tag_name) {
        const { data: res } = await this.http.get(
          'http://127.0.0.1:3000/tag/gettagbyname?tag_name=' +
            this.search_tag_name
        )
        console.log(res)
        if (res.meta.status === 200) {
          if (JSON.parse(res.data).length !== 0) {
            this.message.success('查找成功')
            this.tagList = JSON.parse(res.data)
          } else {
            this.message.error('查无此记录')
          }
        }
      }
    }
  },
  watch: {
    search_sort_name: function() {
      if (!this.search_sort_name) {
        this.getAllSorts()
      }
    },
    search_tag_name: function() {
      if (!this.search_tag_name) {
        this.getAllTags()
      }
    }
  },
  created() {
    //获取所有文章列表
    this.getAllArticles()
    this.getAllSorts()
    this.getAllTags()
  }
}
</script>
<style lang="less" scoped>
.manage {
  width: 100%;
  padding: 0 60px;
  margin-top: 25px;
  height: 1200px;
  .manage-header {
    line-height: 30px;
    padding-left: 15px;
    // background-color: skyblue;
    border-left: 4px solid skyblue;
    margin: 10px 0;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    // margin-left: 40px;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid skyblue;
  }
}
</style>
