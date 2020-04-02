<template>
  <div class="class-wrap">
    <div class="editor">
      <div class="function">
        <i class="smile outline icon" @click="choose(0)"></i>
        <i class="image outline icon" @click="choose(1)"></i>
        <i class="linkify icon" @click="choose(2)"></i>
        <i class="quote left icon" @click="choose(3)"></i>
        <i class="code icon" @click="choose(4)"></i>
        <span class="hr" @click="addHr()">hr</span>
        <i class="eye icon" @click="choose(6)"></i>
      </div>
      <textarea id="edit" v-model="content" class="textarea" @focus="focusEvent" @blur="blurEvent"></textarea>
    </div>
    <div class="model">
      <face :isShow="current===0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <img-upload :isShow="current===1" @closeEvent="closeModal()" @addEvent="addPic"></img-upload>
      <link-add :isShow="current===2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote :isShow="current===3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input
        :isShow="current===4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview :isShow="current===6" :content="content" @closeEvent="closeModal()"></preview>
    </div>
  </div>
</template>
<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeInput from './CodeInput'
import Preview from './Preview'
export default {
  name: 'Editor',
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
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
  watch: {
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
  },
  methods: {
    closeModal () {
      this.current = ''
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    getPos () {
      let cursorPos = 0
      const elem = document.getElementById('edit')
      if (document.selection) {
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    addFace (item) {
      const insertContent = `face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.inseert(insertContent)
      this.pos += insertContent.length
    },
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    handleBodyClick (e) {
      e.stopPropagation()
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.closeModal()
      }
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
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
  width: 100%;
  height: 250px;
}
</style>
