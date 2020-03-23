<template>
  <div class="class-wrap">
    <div class="editor">
      <div class="function">
        <i class="smile outline icon" @click="choose(0)"></i>
        <i class="image outline icon"></i>
        <i class="linkify icon"></i>
        <i class="quote left icon"></i>
        <i class="code icon"></i>
        <span class="hr" @click="choose(0)">hr</span>
        <i class="eye icon"></i>
      </div>
      <textarea class="textarea"></textarea>
    </div>
    <div class="model">
      <face :isShow="current===0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <!-- <img-upload :isShow="current===1" @closeEvent="closeModal()" @addEvent="addPic"></img-upload>
      <link-add :isShow="current===2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote :isShow="current===3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input
        :isShow="current===4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview :isShow="current===5" :content="content" @closeEvent="closeModal()"></preview>-->
    </div>
  </div>
</template>
<script>
import Face from './Face'
// import ImgUpload from './ImgUpload'
// import LinkAdd from './LinkAdd'
// import Quote from './Quote'
// import CodeInput from './CodeInput'
// import Preview from './Preview'
export default {
  components: {
    Face
    // ImgUpload,
    // LinkAdd,
    // Quote,
    // CodeInput,
    // Preview
  },
  data () {
    return {
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      pos: ''
    }
  },
  methods: {
    closeModal () {
      this.current = ''
    },
    addFace (item) {
      const insertContent = `face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    choose (index) {
      debugger
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    }
  }
}
</script>
<style scoped>
.function {
  position: relative;
  top: 80px;
  height: 50px;
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;
}
.icon {
  font-size: 20px;
  position: relative;
  top: 15px;
  left: 10px;
  padding-right: 35px;
  color: #009688;
}
.hr {
  font-size: 20px;
  position: relative;
  top: 15px;
  left: 10px;
  padding-right: 15px;
  color: #009688;
}
.textarea {
  position: relative;
  top: 80px;
  width: 1033px;
  height: 250px;
}
</style>
