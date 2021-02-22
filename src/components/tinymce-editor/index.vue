<template>
  <!-- 盛放编辑器 -->
  <div class="root">
    <textarea id="mySelection" placeholder="请输入内容...."></textarea>
    <!-- <input type="button" @click="getContent" value="获得内容" /> -->
  </div>
</template>
<script>
import tinyMCE from 'tinymce/tinymce'
// import './skins/ui/oxide/content.min.css'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/lists/plugin.min'
import './langs/zh_CN.js'
import 'tinymce/plugins/code/plugin.min'
import 'tinymce/plugins/advlist/plugin.min'
import 'tinymce/plugins/link/plugin.min'
import 'tinymce/plugins/anchor/plugin.min'
import 'tinymce/plugins/table/plugin.min'
import 'tinymce/plugins/image/plugin.min'
import 'tinymce/plugins/paste/plugin.min'
import 'tinymce/plugins/media/plugin.min'
import 'tinymce/plugins/charmap/plugin.min'
import 'tinymce/plugins/emoticons/plugin.min'
import 'tinymce/plugins/hr/plugin.min'
import 'tinymce/plugins/pagebreak/plugin'
import 'tinymce/plugins/print/plugin.min'
import 'tinymce/plugins/insertdatetime/plugin.min'
import 'tinymce/plugins/preview/plugin.min'
import 'tinymce/plugins/fullscreen/plugin.min'
import 'tinymce/plugins/indent2em/plugin.min'
import 'tinymce/plugins/lineheight/plugin.min'
import 'tinymce/plugins/attachment/plugin.min'
import 'tinymce/plugins/wordcount/plugin.min'
import 'tinymce/plugins/searchreplace/plugin.min'
import 'tinymce/plugins/autosave/plugin.min'
import 'tinymce/plugins/codesample/plugin.min'
// import emotion from 'tinymce/plugins/emoticons'
// import 'prism'
// import '../../assets/js/prism.js'
// import 'tinymce/plugins/spellchecker/plugin.min'
// import 'tinymce/plugins/f'
// import './tinymce.js'
// import '../themes/silver/theme.min.js'
// import './langs/zh_CN.js'
// import './icons/default/icons.min.js'
export default {
  name: 'Index',
  data() {
    return {
      tinymceFlag: 1
    }
  },
  watch: {
    // value() {
    //   console.log(1)
    // }
    // data(newValue) {
    //   this.$emit('input', newValue)
    //   // console.log(oVal)
    // }
  },
  //props用来接收父组件传递过来的数据
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    getContent() {
      console.log(tinyMCE)
      var cnt = tinyMCE.editors['mySelection'].getContent()
      // console.log(this.content)
      console.log(cnt)
      alert(cnt)
      // const cnt = editor.getContent()
      // console.log(cnt)
      // console.log(cnt)
      // alert(cnt)
    },
    initEditor() {
      const _this = this
      window.tinymce.init({
        selector: '#mySelection',
        language: 'zh_CN',
        skin_url: './skins/ui/oxide',
        content_css: './skins/content/default/content.css',
        // skin: 'oxide-dark', //深色版ui
        height: 800, //初始化富文本编辑器的高度
        auto_focus: true, //自动聚焦，一进入鼠标焦点就存在
        branding: false, //隐藏右下角技术支持
        // elementpath: false, //隐藏元素路径
        // statusbar: false,
        //---使用插件----
        toolbar: [
          'code undo redo restoredraft| forecolor backcolor bold italic underline strikethrough link anchor |alignleft aligncenter alignright alignjustify outdent indent ',
          'styleselect formatselect fontselect fontsizeselect codesample|bullist numlist|blockquote subscript superscript removeformat',
          'table image attachment media emoticons charmap hr pagebreak insertdatetime print preview|  fullscreen| indent2em lineheight| wordcount searchreplace'
        ],
        plugins:
          'code,lists,advlist,link,anchor,table,image,media,charmap,emoticons,hr,paste,pagebreak ,insertdatetime,print,preview, fullscreen,indent2em,lineheight,attachment,wordcount,searchreplace ,autosave,codesample',
        paste_data_images: true,
        //设置emojis表情路径，不然会报错，加载不出来、
        emoticons_database_url: 'emojis.js',
        //字体大小配置
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        autosave_interval: '10s',
        autosave_retention: '20m',
        // autosave_restore_when_empty: true,
        //字体格式配置
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue;苹果苹方=PingFang SC;幼圆=幼圆;楷体=楷体;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
        // images_upload_url: 'http://127.0.0.1:3000/uploads',
        images_upload_handler: async function(blobInfo, success, failure) {
          let formData = new FormData()
          // let file = new blobInfo.blob()
          console.log(blobInfo.filename())
          formData.append('file', blobInfo.blob())
          const { data: res } = await _this.http.post(
            'http://127.0.0.1:3000/upload/uploadimg',
            formData
          )
          console.log(res)
          if (res.meta.status === 200) {
            success(res.data.url)
          } else {
            failure('上传失败')
          }
        },
        //监听tinymce初始化完成事件
        setup: (editor) => {
          editor.on('init', (e) => {
            console.log(e)
            editor.setContent(this.value)
          })
        },
        init_instance_callback: (editor) => {
          //init_instance_callback为回调配置项
          // editor.on('input', (e) => {
          //   console.log(e)
          //   var cnt = tinyMCE.editors['mySelection'].getContent()
          //   this.$emit('input', cnt)
          // })
          editor.on('keyup', (e) => {
            var cnt = tinyMCE.editors['mySelection'].getContent()
            if (cnt) {
              this.$emit('input', e.target.innerHTML)
            } else {
              this.$emit('input', cnt)
            }
            // var cnt = tinyMCE.editors['mySelection'].getContent()
          })
          editor.on('mouseup', (e) => {
            // console.log(1)
            // var cnt = tinyMCE.editors['mySelection'].getContent()
            var cnt = tinyMCE.editors['mySelection'].getContent()
            if (cnt) {
              this.$emit('input', e.target.innerHTML)
            } else {
              this.$emit('input', cnt)
            }
          })
          // editor.on('change', (e) => {
          //   this.$emit('change', e.level.content)
          // })
        }
        // inline: true //内联模式
        // toolbar: false //隐藏工具栏
        //-----菜单栏配置-----
        // menubar: 'bar1 bar2',
        // menu: {
        //   //这里就类似大家常用的下拉菜单组件一样，里面肯定要写相应的items项
        //   bar1: { title: '菜单1', items: 'copy paste' }, //此items为添加复制与剪切功能
        //   bar2: { title: '菜单2', items: 'print code' } //此items为添加打印与查看源代码功能
        // }
      })
    }
  },
  // DOM挂载完毕初始化
  mounted() {
    this.initEditor()
  },
  //防止每次切换回来后编辑器不显示
  beforeDestroy() {
    //销毁
    tinyMCE.editors['mySelection'].destroy()
  }
}
</script>
<style lang="less" scoped>
// @import url('../../assets/css/prism.css');
// @import url('/skins/ui/oxide/skin.min.css');
// @import url('./skins/content/default/content.css');
// @import url('./skins/ui/oxide/content.css');
// @import url('./skins/ui/oxide-dark/skin.min.css');
</style>
