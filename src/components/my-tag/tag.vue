<template>
  <div class="tag-item" :class="isActive ? 'tag-active' : ''" @click="selected">
    {{ myvalue }}
  </div>
</template>
<script>
export default {
  name: 'tagItem',
  data() {
    return {
      myvalue: this.label,
      isActive: false
    }
  },
  props: {
    label: {
      type: String
    },
    id: {
      type: Number
    },
    value: {
      type: Array
    }
  },
  methods: {
    selected() {
      console.log(this.isActive)
      if (this.isActive) {
        let index = this.value.indexOf(this.id)
        this.value.splice(index, 1)
        this.isActive = !this.isActive
        this.$emit('input', this.value)
      } else {
        this.isActive = !this.isActive
        this.value.push(this.id)
        this.$emit('input', this.value)
      }
      console.log(this.value)
    }
  },
  created() {
    if (this.value) {
      this.value.forEach((item) => {
        // console.log(item.tag_id)
        // console.log(typeof item)
        if (item === this.id) {
          this.isActive = true
        } else if (typeof item === 'object') {
          console.log(this.id)
          if (item.tag_id === this.id) {
            this.isActive = true
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
.tag-item {
  display: inline-block;
  // padding: 10px;
  height: 32px;
  font-size: 12px;
  padding: 0 10px;
  line-height: 32px;
  white-space: nowrap;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #f4f4f5;
  color: #333;
}
.tag-active {
  color: #409eff;
  background-color: #ecf5ff;
}
</style>
