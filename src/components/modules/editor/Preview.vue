<template>
  <div class="preview">
    <div class="model" v-show="isShow">
      <div class="title">预览</div>
      <div class="content" v-html="replaceContent"></div>
      <span class="close-button" @click="cancel()">
        <a class>X</a>
      </span>
    </div>
  </div>
</template>
<script>
import { escapeHtml } from '../../../util/escapeHtml'
export default {
  name: 'Preview',
  props: ['isShow', 'content'],
  watch: {
    isShow (newval, oldval) {
      if (newval) {
        this.$store.commit('setHide', true)
      } else {
        this.$store.commit('setHide', false)
      }
    }
  },
  computed: {
    replaceContent () {
      // 根据content的内容，转义成为html代码
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      return escapeHtml(this.content)
    }
  },
  methods: {
    cancel () {
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang="css" scoped>
.model {
  position: absolute;
  top: -105px;
  left: -40px;
  width: 1310px;
  height: 900px;
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
  width: 1310px;
}
.content {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 1250px;
  height: 900px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  color: black;
}
</style>
