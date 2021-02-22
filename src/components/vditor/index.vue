<template>
  <div id="myvditor">
    <div :id="id"></div>
  </div>
</template>
<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
  name: 'vditor',
  data() {
    return {
      contentEditor: '',
      content: this.value
    }
  },
  props: {
    value: {
      type: String
    },
    id: {
      type: String
    }
  },
  watch: {
    value(newVal) {
      this.content = newVal
      console.log(newVal)
      console.log(this.content)
      console.log('hah')
      // this.$emit('input', this.contentEditor.getHTML())
    }
  },
  created() {
    // console.log('hhah')
    // console.log(this.value)
  },
  methods: {
    initEditor() {
      let _this = this
      let options = {
        height: 360,
        mode: 'sv',
        outline: true,
        counter: {
          enable: true
        },
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        input() {
          // console.log(_this.contentEditor.getValue())
          // console.log(_this.contentEditor.getHTML())
          _this.$emit('input', _this.contentEditor.getValue())
        },
        after() {
          // console.log(_this.value)
          _this.contentEditor.setValue(_this.content)
        },
        upload: {
          url: 'http://127.0.0.1:3000/upload/uploadimg',
          linkToImgUrl: 'http://127.0.0.1:3000/upload/uploadimg',
          fieldName: 'file',
          multiple: false,
          format(files, res) {
            console.log(files)
            console.log(res)
            if (JSON.parse(res).meta.status === 200) {
              let imgURL = JSON.parse(res).data.url
              let filename = JSON.parse(res).data.filename
              let file = {}
              file[filename] = imgURL
              return JSON.stringify({
                msg: '上传成功',
                code: '0',
                data: {
                  errFiles: [],
                  succMap: file
                }
              })
            }
          },
          // filename(name) {
          //   console.log(name)
          // },
          // handler(files) {
          //   let name = files[0].name
          //   console.log(name)
          // },
          linkToImgCallback(res) {
            console.log(res)
          },
          linkToImgFormat(res) {
            // console.log(res)
            const data = JSON.parse(res)
            console.log(data.data)
            return JSON.stringify({
              msg: '上传成功',
              code: 0,
              data: {
                originalURL: data.data.originPath,
                url: data.data.url
              }
            })
          }
          // file(file) {}
        }
      }
      if (_this.id === 'vditor-desc') {
        options.counter = {
          enable: true,
          max: 150
        }
      }
      this.contentEditor = new Vditor(this.id, options)
    }
  },
  mounted() {
    this.initEditor()
  }
}
</script>
