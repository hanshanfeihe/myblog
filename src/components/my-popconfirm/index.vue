<template>
  <div class="pop-confirm">
    <slot></slot>
    <div class="pop" v-if="visible">
      <div class="trn"></div>
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunwen"></use>
        </svg>
        <span>{{ myTitle }}</span>
      </div>
      <div class="footer">
        <my-button
          btnValue="确定"
          type="primary"
          small
          @click="confirm"
        ></my-button>
        <my-button btnValue="取消" small @click="cancel"></my-button>
      </div>
    </div>
  </div>
</template>
<script>
import MyButton from '../my-button/index.vue'
export default {
  name: 'myPopconfirm',
  data() {
    return {
      myTitle: '确定删除吗',
      visible: false
    }
  },
  components: {
    MyButton
  },
  methods: {
    show() {
      console.log(1)
      this.visible = true
    },
    confirm(e) {
      this.visible = false
      this.$emit('confirm', e)
    },
    cancel(e) {
      this.visible = false
      this.$emit('cancel', e)
    }
  },
  mounted() {
    // console.log(this.$slots.default[0].elm)
    this.$slots.default[0].elm.addEventListener('click', this.show)
  }
}
</script>
<style lang="less" scoped>
.pop-confirm {
  display: inline-block;
  position: relative;
  // width: 200px;
}
.pop {
  z-index: 99999;
  position: absolute;
  width: 160px;
  top: -70px;
  left: 20%;
  background-color: #fff;
  text-align: center;
  // padding: 12px 16px;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  // .title {
  //   padding: 10px 0 10px 10px;
  // }
  .footer {
    text-align: right;
  }
  .trn {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 15px;
    top: 62px;
    background-color: #fff;
    transform: rotate(45deg);
  }
}
</style>
