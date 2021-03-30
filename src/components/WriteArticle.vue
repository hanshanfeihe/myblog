<template>
  <div id="blog-manage">
    <div class="left addblog">
      <!-- 写文章区域 -->
      <label for="title">文章标题：</label>
      <input
        type="text"
        name="title"
        id="title"
        v-model="article.title"
        placeholder="请输入文章标题"
        @blur="showTip"
        @input="showTip"
      />
      <div class="tip" v-if="ctfTitle">标题不能为空!</div>
      <!-- <label for="desc">文章描述：</label>
      <textarea
        name="desc"
        id="desc"
        cols="30"
        rows="10"
        v-model="article.blog_desc"
        placeholder="请填写文章的描述内容"
        style="width:100%;"
      ></textarea> -->
      <label for="desc">文章描述：</label>
      <vditor v-model="article.blog_desc" id="vditor-desc" v-if="flag"></vditor>
      <!-- <div class="upload-img"> -->
      <!-- <form
            action="http://127.0.0.1:3000/upload/uploadimg"
            method="post"
            enctype="multipart/form-data"
          > -->
      <!-- <label for="">博客文章封面上传:</label>
        <label for="file" class="upload"><span>+</span></label> -->
      <!-- multiple多 -->
      <!-- <input
          type="file"
          name="file"
          id="file"
          @change="show"
          accept="image/*"
        /> -->
      <!-- 图片预览 -->
      <!-- <div class="imgpreview">
          <p v-if="!imgFile">还没有图片上传</p>
          <div class="image-info" v-else>
            <img :src="src" alt="" />
            <span>文件名:{{ imgFile.name }}</span>
            <span>文件大小:{{ imgFile.size | returnFileSize }}</span>
          </div>
        </div> -->
      <!-- </form> -->
      <!-- </div> -->
      <!-- 下拉列表选择分类 -->
      <label for="category">文章分类：</label>
      <my-selector :categoryData="categoryList" v-model="article.SortSortId">
        <my-select-item
          v-for="item in categoryList"
          :label="item.sort_name"
          :value="item.sort_id"
          :key="item.sort_id"
        ></my-select-item>
      </my-selector>
      <label class="articlecontent" style="text-align:left">文章内容：</label>
      <!-- <div class="savetime">自动保存于:</div> -->
      <!-- <TinymceEditor v-model="data"></TinymceEditor> -->
      <vditor
        v-model="article.content"
        id="vditor-content"
        v-if="flag"
      ></vditor>
      <!-- {{ article.content }} -->
      <label for="category">选择文章标签：</label>
      <div class="tagarea">
        <tag-item
          v-for="item in tagList"
          :key="item.tag_id"
          :label="item.tag_name"
          :id="item.tag_id"
          v-model="article.selectTagIds"
        ></tag-item>
      </div>
      <div class="options">
        <button @click="showContent" id="sent" v-if="!id">发表文章</button>
        <my-button
          @click="updateContent"
          id="sent"
          v-else
          type="primary"
          btnValue="保存修改"
        ></my-button>
        <!-- <my-button
          btnValue="发表文章"
          @click="showContent2"
          type="primary"
        ></my-button> -->
      </div>
    </div>
  </div>
</template>
<script>
// import TinymceEditor from '../components/tinymce-editor/index.vue'
import mySelector from "../components/my-select/index.vue";
import myButton from "../components/my-button/index.vue";
import mySelectItem from "../components/my-select/my-selectItem/index.vue";
import tagItem from "../components/my-tag/tag.vue";
import Vditor from "../components/vditor/index.vue";
// import myModal from '../components/my-modal/index.vue'
// import 'prism'
export default {
  name: "WriteManage",
  data() {
    return {
      flag: false,
      saveTime: "",
      // 表单内容
      data: "",
      imgFile: "", //上传的博客封面图片文件
      src: "",
      c_Id: "2",
      categoryList: [],
      tagList: [],
      article: {
        content: "", //文章内容
        title: "", //文章标题
        status: "1", //文章状态
        SortSortId: 0, //文章分类
        blog_desc: "", //文章描述
        blog_cover: "", //博客文章封面
        selectTagIds: []
      },
      ctfTitle: false //标题输入验证
    };
  },
  filters: {
    // 过滤器 将文件大小转换成对应单位显示
    returnFileSize: function(number) {
      if (number < 1024) {
        return number + "bytes";
      } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(2) + "KB";
      } else if (number >= 1048576) {
        return (number / 1048576).toFixed(2) + "MB";
      }
    }
  },
  props: {
    id: Number
  },
  watch: {
    data() {
      this.article.content = this.data;
    }
  },
  components: {
    // TinymceEditor,
    Vditor,
    mySelector,
    myButton,
    mySelectItem,
    tagItem
    // myModal
  },
  mounted() {},
  methods: {
    async showContent() {
      console.log(this.article);
      const { data: res } = await this.http.post(
        "http://127.0.0.1:3000/article/insertarticle",
        this.article
      );
      if (res.meta.status === 200) {
        this.message.success("添加文章成功");
      } else {
        this.message.error("添加文章失败");
      }
    },
    showContent2() {
      console.log(this.article.content);
    },
    async updateContent() {
      console.log(this.article);
      const { data: res } = await this.http.put(
        "http://127.0.0.1:3000/article/updatearticle",
        this.article
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.message.success("更新成功");
      }
    },
    showTip() {
      if (!this.article.title) {
        // alert('标题不能为空')
        this.ctfTitle = true;
      } else {
        this.ctfTitle = false;
      }
    },
    async show(e) {
      console.log(e);
      this.imgFile = e.target.files[0];
      if (this.imgFile) {
        this.src = URL.createObjectURL(this.imgFile);
        //表单对象
        let formData = new FormData();
        formData.append("file", this.imgFile);
        const { data: res } = await this.http.post(
          "http://127.0.0.1:3000/upload/uploadimg",
          formData
        );
        console.log(res);
        if (res.meta.status === 200) {
          this.article.blog_cover = res.data.url;
        } else {
          this.article.blog_cover = "";
        }
      }
      console.log(this.imgFile);
    },
    async getCategoryList() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/sort/getsortlists"
      );
      // console.log(res)
      if (res.meta.status === 200) {
        this.categoryList = JSON.parse(res.data);
      }
      // console.log(this.categoryList[0].sort_id)
    },
    async getTagList() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/tag/gettaglists"
      );
      // console.log(res)
      if (res.meta.status === 200) {
        this.tagList = JSON.parse(res.data);
      }
      console.log(this.tagList[0].tag_id);
    }
  },
  async created() {
    console.log(this.id);
    console.log(this.$route.params);
    if (this.$route.params.id) {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/article/findarticlebyid?id=" + this.id
      );
      console.log(JSON.parse(res.data));
      this.article = JSON.parse(res.data);
      console.log(this.article);
      this.article.selectTagIds = [];
      this.article.Tags.forEach(item => {
        this.article.selectTagIds.push(item.tag_id);
      });
      this.flag = true;
    }
    this.getCategoryList(), this.getTagList();
    this.flag = true;
  },
  beforeRouteLeave(to, from, next) {
    console.log(from.name);
    if (from.name === "WriteArticle") {
      const answer = window.confirm("当前页面数据未保存，确定要离开？");
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#blog-manage {
  min-width: 800px;
  position: relative;
  padding: 10px;
  width: 100%;
  // margin: 20px auto;
  .left {
    padding: 10px;
    // background-color: skyblue;
    // border-radius: 10px;
    background-color: white;
    margin-right: 15px;
    .options {
      width: 100%;
      margin: 20px auto;
      text-align: center;
      button {
        outline: none;
        appearance: none;
        line-height: 35px;
        width: 100px;
        border-radius: 25px;
        color: white;
        border-style: none;
        background-color: #409eff;
        padding: 0;
      }
      button:hover {
        opacity: 0.8;
      }
    }
  }
  label {
    display: block;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 10px;
    color: #333;
  }
  .tip {
    // display: none;
    color: red;
    margin: 0 10px;
    font-size: 12px;
  }
  #title:focus {
    border-color: skyblue;
  }
  #desc {
    font-size: 16px;
    padding: 10px;
  }
  .upload-img {
    #file {
      display: none;
    }
    .imgpreview {
      width: 100%;
      padding: 0 20px;
      border: 1px solid #333;
      margin: 15px 0;
      height: 100px;
      line-height: 100px;
      p {
        color: #ccc;
      }
      // background-color: #ccc;
      .image-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 80px;
          border: 1px dashed skyblue;
        }
      }
    }
    .upload {
      display: flex;
      align-items: center;
      border: 1px dashed;
      font-size: 28px;
      justify-content: center;
      opacity: 0.5;
      width: 100px;
      height: 100px;
      // background-color: #ccc;
    }
    .upload:hover {
      border-color: #409eff;
    }
  }
  #title {
    // appearance: none;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid #ccc;
    width: 100%;
    // border: none;
    // border-color: skyblue;
    height: 35px;
    // background-color: #ccc;
    font-size: 14px;
  }
}
</style>
