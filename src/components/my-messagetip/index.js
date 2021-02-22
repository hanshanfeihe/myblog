import Vue from 'vue'
import MessageTip from './index.vue'
const MessageConstructor = Vue.extend(MessageTip)
let tid = 1
//在body下新建标签名
// let tagClass = 'my-messagetip'
const Message = (options) => {
  console.log(options)
  if (JSON.stringify(options) === undefined) {
    return false
  }
  let id = 'message_' + tid++
  if (typeof options === 'string') {
    options = {
      msg: options
    }
  }
  const messageInstance = new MessageConstructor({
    data: options
  })
  messageInstance.id = id
  messageInstance.vm = messageInstance.$mount()
  messageInstance.vm.isShow = true
  messageInstance.dom = messageInstance.vm.$el
  document.body.appendChild(messageInstance.dom)
  return messageInstance.vm
}
;['success', 'error'].forEach((item) => {
  Message[item] = (options) => {
    if (typeof options === 'string') {
      options = {
        msg: options
      }
    }
    options.type = item
    options.message = item
    return Message(options)
  }
})
export default Message
