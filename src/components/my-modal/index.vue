<template>
  <div class="my-modal" v-if="isOpen">
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ titleValue }}</h4>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <my-button btnValue="取消" @click="cancel"></my-button>
        <my-button btnValue="确定" type="primary" @click="OK"></my-button>
      </div>
    </div>
  </div>
</template>
<script>
import myButton from "../my-button/index.vue";
export default {
  name: "MyModal",
  components: {
    myButton
  },
  data() {
    return {
      titleValue: this.title
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Title"
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    OK() {
      this.$emit("confirm");
    }
  },
  created() {
    window.addEventListener(
      "scroll",
      e => {
        e.returnvalue = false;
        e.preventDefault();
      },
      false
    );
  }
};
</script>
<style lang="less" scoped>
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  .modal-content {
    position: relative;
    top: 50%;
    width: 520px;
    background-color: #fefefe;
    margin: auto;
    transform: translateY(-50%);
    border: 1px solid #888888;
    border-radius: 4px;
    animation-name: animatetop;
    animation-duration: 0.4s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .modal-header {
      background-color: #fff;
      padding: 16px 24px;
      border-bottom: 1px solid #e8e8e8;
      border-radius: 4px 4px 0 0;
    }
    .modal-body {
      padding: 24px;
      line-height: 1.5;
      font-size: 14px;
      border-bottom: 1px solid #e8e8e8;
    }
    .modal-footer {
      padding: 10px 16px;
      text-align: right;
    }
    @keyframes animatetop {
      from {
        top: -300px;
        opacity: 0;
      }
      to {
        top: 50%;
        // transform: translateY(-50%);
        opacity: 1;
      }
    }
  }
}
</style>
