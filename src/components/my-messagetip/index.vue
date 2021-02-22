<template>
  <transition name="tip">
    <div :class="message" class="message" v-if="isShow">
      <svg class="icon" aria-hidden="true" v-if="type === 'success'">
        <use xlink:href="#icon-chenggong"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-if="type === 'error'">
        <use xlink:href="#icon-shibai"></use>
      </svg>
      <span>{{ msg }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'myMessage',
  data() {
    return {
      isShow: false,
      type: 'success',
      msg: '',
      message: ''
    }
  },
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  mounted() {
    var _this = this
    setTimeout(function() {
      // alert(_this.isShow)
      _this.isShow = false
    }, 1500)
  },
  created() {}
}
</script>
<style lang="less">
.message {
  position: fixed;
  line-height: 30px;
  z-index: 100001;
  top: 100px;
  width: 200px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.3);
}
.success {
  background-color: #80ffdb;
  color: #fff;
}
.error {
  background-color: #ccc;
  color: red;
}
.icon {
  margin-right: 5px;
}
.tip-enter-active {
  transition: all 0.5s ease;
}
.tip-leave-active {
  transition: all 0.5s ease;
}
//进入前状态
.tip-enter,
.tip-leave-to {
  top: -100px;
  opacity: 0;
}
</style>
