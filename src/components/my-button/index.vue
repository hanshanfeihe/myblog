<template>
  <button @click="btnClick" :class="[type, isSmall ? 'small' : '']">
    {{ value }}
  </button>
</template>
<script>
export default {
  name: 'MyButton',
  data() {
    return {
      value: this.btnValue,
      myPrimary: this.primary,
      isDanger: this.danger,
      isSmall: this.small
    }
  },
  props: {
    btnValue: {
      type: String,
      dafault: ''
    },
    type: {
      type: String
    },
    small: Boolean,
    danger: Boolean
  },
  methods: {
    btnClick() {
      // console.log(11)
      this.$emit('click')
    }
  },
  created() {
    // console.log(this.danger)
  }
}
</script>
<style lang="less" scoped>
button {
  outline: none;
  appearance: none;
  line-height: 35px;
  margin: 5px 5px 0 0;
  // width: 100px;
  color: white;
  // border-radius: 5px;
  border-style: none;
  background-color: #fff;
  color: #fff;
  border: 1px solid #d9d9d9;
  padding: 5px 8px;
}
.small {
  width: 60px;
  line-height: 25px;
}
.primary {
  background-color: #409eff;
}
.danger {
  background-color: #f56c6c;
}
.warn {
  background-color: #e6a23c;
}
button:hover {
  opacity: 0.8;
  // color: skyblue;
}
</style>
