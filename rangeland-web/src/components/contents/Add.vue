<template>
  <div class="add-container">
    <div class="post-tab font-green">发表新帖</div>
    <hr class="selected-line" />
    <hr class="normal-line" />
    <validation-observer ref="observer" v-slot="{validate}">
      <form class="ui form form-wrapper">
        <div class="classify">
          <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}">
            <div class="special-column">
              <!-- <div class="ui dropdown labeled"> -->
              <div class="text">所在专栏</div>
              <select class="ui dropdown special" v-model="selected">
                <!--本来是通过不增加变量来实现，可是失败了-->
                <option
                  v-for="(catalog,index) in catalogs"
                  :key="'catalog'+index"
                  :value="catalog.value"
                >{{catalog.text}}</option>
              </select>

              <span class="catalog-error-message">{{errors[0]}}</span>
            </div>
          </validation-provider>
          <validation-provider name="title" rules="required" v-slot="{errors}">
            <div class="ui input title">
              <div class="text">标题</div>
              <input type="text" v-model="title" placeholder="请输入标题" />
              <span class="title-error-message">{{errors[0]}}</span>
            </div>
          </validation-provider>
        </div>
        <div class="add-editor">
          <editor @changeContent="add" :initContent="content"></editor>
        </div>
        <div class="kiss">
          <div class="text">悬赏飞吻</div>
          <select class="ui dropdown kiss" v-model="favlist[favIndex]">
            <option v-for="(fav,index) in favlist" :key="'fav'+index" :value="fav">{{fav}}</option>
          </select>
          <div class="description">发表后无法更改飞吻</div>
        </div>
        <validation-provider
          name="code"
          ref="codefield"
          rules="required|length:4"
          v-slot="{errors}"
        >
          <div class="code-wrapper">
            <div class="text">验证码</div>
            <input class="code-input" type="text" name="code" v-model="code" placeholder="请输入验证码" />
            <span class="svg" @click="_getCode()" v-html="svg"></span>
            <span class="code-error-message">{{errors[0]}}</span>
          </div>
        </validation-provider>
        <button class="publish" type="button" @click="validate().then(submit)">立即发布</button>
      </form>
    </validation-observer>
  </div>
</template>
<script>
import Editor from '../modules/editor/Index'
import { addPost } from '@/api/content'
import CodeMix from '@/mixin/code'
export default {
  name: 'add',
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      selected: '请选择',
      catalogs: [
        {
          text: '请选择',
          value: '请选择'
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favlist: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },
  mounted () {
    const saveData = localStorage.getItem('addData')
    if (saveData && saveData !== '') {
      this.$confirm(
        '是否加在未编辑完的内容？',
        () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        },
        () => {
          localStorage.setItem('addData', '')
        }
      )
    }
  },
  methods: {
    // chooseCatalog (item, index) {
    //   this.cataIndex = index
    // },
    // chooseFav (item, index) {
    //   this.favIndex = index
    // },
    // changeSelect () {
    //   this.isSelect = !this.isSelect
    // },
    // changeFav () {
    //   this.isSelect_fav = !this.isSelect
    // },
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
      }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      console.log('submit -> isValid', isValid)
      if (!isValid) {
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空！')
        return
      }
      console.log(
        'submit -> title',
        this.title,
        this.code,
        this.$store.state.sid,
        this.cataIndex,
        // this.catalogs[this.cataIndex].value,
        this.selected,
        this.favlist[this.favIndex]
      )
      addPost({
        title: this.title,
        catalog: this.selected,
        content: this.content,
        fav: this.favlist[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          console.log('submit -> res', res)
          if (res.code === 200) {
            localStorage.setItem('addData', '')
            this.$alert('发帖成功～2s后跳转')
            setTimeout(() => {
              this.$router.push({ name: 'index' })
            }, 2000)
          } else {
            this.$alert(res.msg)
          }
        })
        .catch(err => {
          if (err.response.data.code === 401) {
            this.$alert('请先登录')
          } else {
            const data = err.response.data
            console.log('submit -> data', data)
          }
        })
    }
  },
  computed: {
    // isHide () {
    //   return this.$store.state.isHide
    // }
  }
}
</script>
<style scoped>
</style>
