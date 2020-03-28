<template>
  <div name="fade">
    <div class="model" v-show="isShow">
      <div class="title">请帖入代码或任意文本</div>
      <textarea
        class="code-input"
        v-model="code"
        id="codeInput"
        v-on:keydown.enter="$event.stopPropagation"
        :style="{'width':this.width+'px','height':this.height+'px'}"
      ></textarea>
      <span class="close-button" @click="cancel()">
        <a href="javascript:;">X</a>
      </span>
      <div class="common-button">
        <a class="confirm-button" @click.prevent="submit()">确定</a>
        <a class="cancel-button" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Code',
  props: ['isShow', 'width', 'height'],
  data () {
    return {
      code: ''
    }
  },
  methods: {
    submit () {
      if (this.code === '') {
        document.getElementById('codeInput').focus()
        this.$pop('shake', '请输入引用内容')
        return
      }
      this.$emit('addEvent', this.code)
      setTimeout(() => {
        this.code = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.code = ''
      this.$emit('closeEvent')
    }
  }
}
</script>
<style scoped>
.model {
  position: absolute;
  top: 227px;
  left: 53px;
  width: 450px;
  height: 300px;
  z-index: 100;
  background-color: white;
  box-shadow: 10px 10px 5px #e6e6e6;
  border: 1px solid #e6e6e6;
}
.title {
  position: absolute;
  background-color: #fbfbfb;
  font-size: 15px;
  padding: 10px;
  width: 450px;
}
.code-input {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 300px;
  height: 100px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  color: black;
}
.common-button {
  position: absolute;
  top: 264px;
  right: 30px;
}
.confirm-button {
  position: relative;
  right: 10px;
  padding: 5px 9px;
  background-color: #1e9fff;
  color: white;
}
.cancel-button {
  color: black;
  border: 1px solid #e6e6e6;
  padding: 5px 10px;
}
</style>
