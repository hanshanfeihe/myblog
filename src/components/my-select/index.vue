<template>
  <div id="myselector">
    <div
      class="selected-label"
      @click.stop="showSelect"
      :class="isActive ? 'active' : ''"
    >
      {{ defaultValue }}
    </div>
    <div class="select">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mySelector',
  data() {
    return {
      defaultValue: '请选择',
      isActive: false,
      myvalue: this.value
    }
  },
  props: {
    value: {
      type: Number
    }
  },
  watch: {
    myvalue() {
      this.$emit('input', this.myvalue)
    }
  },
  methods: {
    showSelect() {
      // console.log('sa')
      this.isActive = !this.isActive
    }
  },
  created() {},
  mounted() {
    var _this = this
    var i = document.querySelector('body')
    // console.log(i)
    i.onclick = function() {
      // console.log(1)
      _this.isActive = false
    }
  }
}
</script>
<style lang="less" scoped>
#myselector {
  position: relative;
  // padding: 0 20px;
  width: 200px;
  background-color: #ccc;
  .select {
    width: 100%;
    z-index: 999;
    height: 0;
    position: absolute;
    top: 0px;
    border-top: 1px solid #ccc;
    left: 0;
    opacity: 0;
    transition: all 0.5s;
    // background-color: #ccc;
  }
  .selected-label {
    position: relative;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 0 20px;
    width: 200px;
  }
  .active + .select {
    position: absolute;
    top: 40px;
    opacity: 1;
  }
  .active + .select > div {
    height: 30px !important;
    opacity: 1;
    background-color: #fff;
    position: relative;
  }
}
</style>
