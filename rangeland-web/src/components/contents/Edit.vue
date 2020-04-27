<template>
  <div class="add-container">
    <div class="post-tab font-green">编辑帖子</div>
    <hr class="selected-line" />
    <hr class="normal-line" />
    <validation-observer ref="observer" v-slot="{validate}">
      <form class="ui form form-wrapper">
        <div class="classify">
          <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}">
            <div class="special-column">
              <div class="text">所在专栏</div>
              <select class="ui disabled dropdown special">
                <option value="page.catalog">{{page.catalog}}</option>
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
          <select class="ui disabled dropdown kiss">
            <option value="page.fav">{{page.fav}}</option>
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
import { updatePost } from '@/api/content'
import CodeMix from '@/mixin/code'
export default {
  name: 'add',
  props: ['tid', 'page'],
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
    if (this.page) {
      const saveData = {
        content: this.page.content,
        title: this.page.title,
        favIndex: this.page.favIndex,
        cataIndex: this.page.cataIndex
      }
      localStorage.setItem('addData', JSON.stringify(saveData))
    } else {
      const result = localStorage.getItem('editData')
      if (result) {
        // 不知道怎么写
      } else {
        localStorage.setItem('editData', '')
      }
    }
  },
  methods: {
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        let editData = JSON.parse(localStorage.getItem('editData'))
        if (editData && editData !== '') {
          editData = { ...saveData, ...editData }
          localStorage.setItem('editData', JSON.stringify(editData))
        }
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
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          if (res.code === 200) {
            localStorage.setItem('editData', '')
            this.$alert('帖子更新成功！')
            setTimeout(() => {
              this.$router.push({ name: 'detail', params: { tid: this.tid } })
            }, 1000)
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
