<template>
  <div class="LinkAdd">
    <div class="model" v-show="isShow">
      <div class="title">请输入合法链接</div>
      <input type="text" class="link-input" id="linkInput" v-model="link" />
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
  name: 'LinkAdd',
  props: ['isShow'],
  data () {
    return {
      link: ''
    }
  },
  methods: {
    submit () {
      if (this.link === '') {
        document.getElementById('linkInput').focus()
        this.$pop('shake', '请输入合法的链接')
        return
      }
      this.$emit('addEvent', this.link)
      setTimeout(() => {
        this.link = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.$emit('closeEvent')
      this.link = ''
    }
  }
}
</script>

<style lang="css" scoped>
.model {
  position: absolute;
  top: 230px;
  left: 55px;
  background-color: white;
  box-shadow: 10px 10px 5px #e6e6e6;
  border: 1px solid #e6e6e6;
  width: 300px;
  height: 150px;
}
.title {
  position: absolute;
  background-color: #fbfbfb;
  font-size: 15px;
  padding: 10px;
  width: 300px;
}
.link-input {
  position: absolute;
  top: 40px;
  left: 40px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  color: black;
}
.common-button {
  position: absolute;
  top: 110px;
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
}
</style>
