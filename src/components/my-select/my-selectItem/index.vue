<template>
  <div class="selectItem" @click="selected">
    <div class="item">{{ valLabel }}</div>
  </div>
</template>
<script>
export default {
  name: 'selectItem',
  data() {
    return {
      valLabel: this.label
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: Number
    }
  },
  methods: {
    selected() {
      // console.log(this.value)
      this.$parent.defaultValue = this.label
      this.$parent.myvalue = this.value
      console.log(this.$parent.myvalue)
      this.$emit('input', this.$parent.myvalue)
    }
  },
  created() {
    console.log(this.$parent.value)
    if (this.value === this.$parent.value) {
      console.log(this.$parent.value)
      this.$parent.defaultValue = this.label
    }
  }
}
</script>
<style lang="less" scoped>
.selectItem {
  // position: absolute;
  // top: 0;
  height: 0;
  opacity: 0;
  transition: all 0.5s;
  // left: 0;
  padding: 0px 20px;
  border: 1px solid #ccc;
  border-top: none;
}
// .selectItem:hover {
//   background-color: skyblue;
// }
</style>
