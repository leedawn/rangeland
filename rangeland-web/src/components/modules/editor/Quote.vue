<template>
  <div class="quote">
    <div class="model" v-show="isShow">
      <div class="title">请输入引用内容</div>
      <textarea class="quote" id="quoteInput" v-model="quote" style="width: 300px; height: 100px;"></textarea>
      <span class="close-button" @click="cancel()">
        <a href="javascript:void(0)">X</a>
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
  name: 'Quote',
  props: ['isShow'],
  data () {
    return {
      quote: ''
    }
  },
  methods: {
    submit () {
      if (this.quote === '') {
        document.getElementById('quoteInput').focus()
        this.$pop('shake', '请输入引用内容')
        return
      }
      this.$emit('addEvent', this.quote)
      setTimeout(() => {
        this.quote = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.quote = ''
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="css" scoped>
.model {
  position: absolute;
  top: 175px;
  left: 30px;
  background-color: white;
  box-shadow: 10px 10px 5px #e6e6e6;
  border: 1px solid #e6e6e6;
  width: 350px;
  height: 220px;
}
.title {
  position: absolute;
  background-color: #fbfbfb;
  font-size: 15px;
  padding: 10px;
  width: 300px;
}
.quote {
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
  top: 170px;
  right: 40px;
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
