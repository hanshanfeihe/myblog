<template>
  <div class="manage-article">
    <div class="manage-header">
      文章管理
    </div>
    <div class="article-manage">
      <my-table :columns="propData" :data="articleList">
        <template slot="sort" slot-scope="rowData">
          <div>
            {{ rowData.row.Sort.sort_name }}
          </div>
        </template>
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
  </div>
</template>
<script>
import MyTable from '../my-table/index.vue'
import myButton from '../my-button/index.vue'
// import myModal from '../my-modal/index.vue'
import myPopconfirm from '../my-popconfirm/index.vue'
export default {
  name: 'articleManage',
  components: {
    MyTable,
    myButton,
    // myModal,
    myPopconfirm
  },
  data() {
    return {
      articleList: [],
      propData: [
        {
          title: '名称',
          width: '300',
          key: 'title'
        },
        {
          title: '发布日期',
          width: '200',
          key: 'create_time'
        },
        {
          title: '分类',
          width: '200',
          slotName: 'sort'
        },
        {
          title: '操作',
          width: '150',
          slotName: 'option'
        }
      ]
    }
  },
  filters: {},
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
    articlepopCancel() {
      this.message.success('取消删除')
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
    editArticle(id) {
      console.log(id)
      this.$router.push({ name: 'WriteArticle', params: { id: id } })
    }
  },
  created() {
    this.getAllArticles()
  }
}
</script>
<style lang="less" scoped>
.manage-article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  padding: 0 20px;
  .manage-header {
    // flex: 1;
    line-height: 30px;
    padding-left: 15px;
    // background-color: skyblue;
    border-left: 4px solid skyblue;
    margin: 10px 0;
  }
}
</style>
