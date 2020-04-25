<template>
  <div class="chat">
    <form>
      <textarea class="chat-textarea"></textarea>
      <input type="text" name="message" class="message-input" value="Welcome to waylau.com" />
      <input type="button" class="send-button" value="发送消息" onclick="send(this.form.message.value)" />
      <input
        type="button"
        class="clear-button"
        onclick="javascript:document.getElementById('responseText').value=''"
        value="清空聊天记录"
      />
      {{info}}
    </form>
  </div>
</template>
<script>
// import WebsocketClient from '@/util/websocket'
export default {
  data () {
    return {
      info: this.$store.state.info
    }
  },
  mounted () {
    console.log(this.in$store.state.infofo)
    // this.init()
  },
  methods: {}
}
</script>
<style scoped>
.chat-textarea {
  position: relative;
  top: 50px;
  width: 65%;
  height: 300px;
}
.message-input {
  position: relative;
  display: block;
  top: 70px;
}
.send-button {
  position: relative;
  left: 160px;
  top: 50px;
}
.clear-button {
  position: relative;
  top: 50px;
  left: 170px;
}
</style>
