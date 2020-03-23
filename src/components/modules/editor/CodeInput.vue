<template>
  <div name="fade">
    <div v-show="isShow">
      <div>请帖入代码或任意文本</div>
      <div>
        <textarea
          v-model="code"
          id="codeInput"
          v-on:keydown.enter="$event.stopPropagation"
          :style="{'width':this.width+'px','height':this.height+'px'}"
        ></textarea>
      </div>
      <span @click="cancel()">
        <a href="javascript:;"></a>
      </span>
      <div>
        <a @click.prevent="submit()">确定</a>
        <a @click.prevent="cancel()">取消</a>
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
